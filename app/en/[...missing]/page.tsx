import { notFound } from "next/navigation";

/** Unknown URLs under /en render the English 404 page inside the English layout. */
export default function CatchAll() {
  notFound();
}
