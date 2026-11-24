import Link from "next/link";
import { notFound } from "next/navigation";
import { apiFetch } from "../../../lib/api";
import { LoanRequest } from "../../../lib/loan-types";

type ReceiptPageProps = { params: Promise<{ id: string }> };

export default async function ReceiptPage({ params }: ReceiptPageProps) {
  // TODO FRONT-C: leer params y consultar el detalle con apiFetch.
  const { id } = await params;
  const requestId = Number(id);
  if (!Number.isSafeInteger(requestId) || requestId < 1 || String(requestId) !== id) {
    notFound();
  }

  const response = await apiFetch(`/loan-requests/${requestId}`);
  if (response?.status === 404) notFound();

  const request: LoanRequest | null = response?.ok
    ? await response.json().catch(() => null)
    : null;

  // TODO FRONT-C: mostrar ID, purpose, days y tool.name de la solicitud recibida.
  void params;
  
  return (
    <main>
      <h1>Loan receipt</h1>
      <Link href="/loan-requests">Back to requests</Link>
      <section className="panel">
        <h2> Request #{requestId}</h2>
        {request ? (
        <>
          <p> ID: {request.id} </p>
          <p> Purpose: {request.purpose} </p>
          <p> Days: {request.days} </p>
          <p> Tool: {request.tool.name} </p>
        </>
      ) : (
        <p role="alert"> The receipt could not be retrieved. </p>
      )}
      </section>
    </main>
  );
}

