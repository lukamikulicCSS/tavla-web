/** /en/llms.txt — English summary for AI assistants and search engines. Content: lib/llms/body.ts */
import { llmsResponse } from "@/lib/llms/body";

export const dynamic = "force-static";

export function GET() {
  return llmsResponse("en");
}
