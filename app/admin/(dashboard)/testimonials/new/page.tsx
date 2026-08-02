import TestimonialForm from "../TestimonialForm";
import { createTestimonial } from "../actions";

export default function NewTestimonialPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <TestimonialForm action={createTestimonial} />
    </div>
  );
}
