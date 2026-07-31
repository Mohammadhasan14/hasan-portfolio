import ScanlineOverlay from "@/components/ScanlineOverlay";
import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import GithubStats from "@/components/GithubStats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getSiteSettings } from "@/lib/queries/site-settings";

// Content lives in Supabase and is editable from the admin panel — without
// this, Next bakes the fetched rows into the static HTML at build time and
// edits wouldn't show up until the next deploy. Phase 2 can tighten this to
// on-demand `revalidatePath("/")` from the admin's publish actions instead
// of waiting out this window.
export const revalidate = 60;

export default async function Home() {
  const settings = await getSiteSettings();

  return (
    <>
      <ScanlineOverlay />
      <CustomCursor />
      <Nav />
      <main>
        <Hero lead={settings?.hero_lead ?? ""} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <GithubStats />
        <Contact
          email={settings?.contact_email ?? ""}
          phone={settings?.phone ?? ""}
          location={settings?.location ?? ""}
          githubUrl={settings?.github_url ?? ""}
          linkedinUrl={settings?.linkedin_url ?? ""}
          resumeUrl={settings?.resume_url ?? ""}
        />
      </main>
      <Footer />
    </>
  );
}
