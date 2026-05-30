import { createServerFn } from "@tanstack/react-start";
import { FALLBACK_PRODUCT_IMAGE, type Product } from "./products";

/**
 * ============================================================
 *  CONNECT YOUR GOOGLE SHEET HERE
 * ============================================================
 *
 *  1. Create a Google Sheet with these columns in the FIRST row
 *     (the header row — order matters, names are for you):
 *
 *        A: Name | B: Price | C: Category | D: Description | E: Image (URL)
 *
 *  2. Share the sheet with the Google account you used to connect
 *     Google Sheets in Lovable (or set it to "Anyone with the link
 *     can view"). The connector reads it server-side using OAuth.
 *
 *  3. Copy the spreadsheet ID from the sheet URL:
 *        https://docs.google.com/spreadsheets/d/<THIS_PART>/edit
 *     and paste it below.
 *
 *  4. (Optional) Change SHEET_RANGE if your data is on a different
 *     tab or starts on a different row.
 *
 *  Tip: you can also set GOOGLE_SHEET_ID as a server secret to
 *  override this constant without editing code.
 * ============================================================
 */
const SPREADSHEET_ID = "1OA2jlOIGyBO95cvlIUi_10R_s1aIbzs6D7kdKFLiCs0";
const SHEET_RANGE = "Sheet1!A2:E"; // skip header row, read 5 columns

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";

function slugify(input: string, fallback: string) {
  const s = input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return s || fallback;
}

export const getProducts = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ products: Product[]; error: string | null }> => {
    const lovableKey = process.env.LOVABLE_API_KEY;
    const sheetsKey = process.env.GOOGLE_SHEETS_API_KEY;
    const spreadsheetId = process.env.GOOGLE_SHEET_ID || SPREADSHEET_ID;

    if (!lovableKey || !sheetsKey) {
      return {
        products: [],
        error:
          "Google Sheets connection is not configured. Reconnect Google Sheets in Lovable.",
      };
    }
    if (!spreadsheetId || spreadsheetId === "PASTE_YOUR_GOOGLE_SHEET_ID_HERE") {
      return {
        products: [],
        error:
          "No Google Sheet ID configured. Paste your sheet ID into src/lib/products.functions.ts (SPREADSHEET_ID).",
      };
    }

    try {
      const url = `${GATEWAY_URL}/spreadsheets/${spreadsheetId}/values/${SHEET_RANGE}`;
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${lovableKey}`,
          "X-Connection-Api-Key": sheetsKey,
        },
      });

      if (!res.ok) {
        const body = await res.text();
        console.error("Google Sheets fetch failed:", res.status, body);
        return {
          products: [],
          error: `Could not load products from Google Sheets (${res.status}).`,
        };
      }

      const json = (await res.json()) as { values?: string[][] };
      const rows = json.values ?? [];

      const products: Product[] = rows
        .map((row, i): Product | null => {
          const [name, priceRaw, category, description, image] = row;
          if (!name || !category) return null;
          const price = Number(String(priceRaw ?? "").replace(/[^0-9.]/g, "")) || 0;
          return {
            id: slugify(name, `row-${i}`),
            name: name.trim(),
            category: category.trim(),
            price,
            description: (description ?? "").trim(),
            image: (image ?? "").trim() || FALLBACK_PRODUCT_IMAGE,
          };
        })
        .filter((p): p is Product => p !== null);

      return { products, error: null };
    } catch (err) {
      console.error("Google Sheets request error:", err);
      return {
        products: [],
        error: "Google Sheets is currently unavailable.",
      };
    }
  },
);
