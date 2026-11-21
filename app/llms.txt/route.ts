/** /llms.txt — sažetak za AI asistente i tražilice (GEO). Sadržaj: lib/llms/body.ts */
import { llmsResponse } from "@/lib/llms/body";

export const dynamic = "force-static";

export function GET() {
  return llmsResponse("hr");
}
