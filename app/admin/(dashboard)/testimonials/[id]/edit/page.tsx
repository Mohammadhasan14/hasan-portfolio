import { notFound } from "next/navigation";
import { createServiceClient } from "@/lib/supabase/service";
import TestimonialForm from "../../TestimonialForm";
import { updateTestimonial } from "../../actions";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServiceClient();
  const { data: testimonial } = await supabase.from("testimonials").select("*").eq("id", id).maybeSingle();

  if (!testimonial) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <TestimonialForm testimonial={testimonial} action={updateTestimonial.bind(null, id)} />
    </div>
  );
}
