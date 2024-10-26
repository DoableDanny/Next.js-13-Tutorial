import CreateForm from "./CreateForm";

// Here, we have a server page component that contains a client component.
export default function CreateTicket() {
  return (
    <main>
      <h2 className="text-primary text-center">Create a New Ticket</h2>
      <CreateForm />
    </main>
  );
}
