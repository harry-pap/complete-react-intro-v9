import { useFormStatus } from "react-dom";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import postContact from "../api/postContact";

export const Route = createLazyFileRoute("/contact")({
  component: ContactRoute,
});

function ContactRoute() {
  const mutation = useMutation({
    mutationFn: function (formData) {
      return postContact(
        formData.get("name"),
        formData.get("email"),
        formData.get("message"),
      );
    },
  });

  if (mutation.isError) {
    return <h1>Too bad, failed to submit your feedback</h1>;
  }

  return (
    <div className="contact">
      <h2>Contact</h2>
      {mutation.isSuccess ? (
        <h3>Submitted successfully!</h3>
      ) : (
        //     normally would redirect and stuff, but it's fine here
        <form action={mutation.mutate}>
          <ContactInput name="name" placeholder="Name" />
          <ContactInput name="email" placeholder="Email" type="email" />
          <textarea name="message" placeholder="Enter your message" />
          <button type="Submit">Submit</button>
        </form>
      )}
    </div>
  );
}

function ContactInput(props) {
  // use this to disable the form when the submission is pending(for example if
  // the server takes long to accept the request)
  const { pending } = useFormStatus();
  return (
    <input
      disabled={pending}
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
}
