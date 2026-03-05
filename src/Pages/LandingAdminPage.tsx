import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import AdminAccessGate from "../components/AdminAccessGate";
import ResizablePagePreview from "../components/ResizablePagePreview";
import {
  type BaseLandingSectionData,
  type FooterLink,
  type FooterSectionData,
  type NewsItem,
  type NewsSectionData,
} from "../data/landing";
import {
  clearLandingDraft,
  clearLandingOverrides,
  getLandingDefaults,
  loadLandingOverrides,
  saveLandingDraft,
  saveLandingOverrides,
  type LandingEditableContent,
} from "../lib/landingAdmin";

export default function LandingAdminPage() {
  const defaults = getLandingDefaults();
  const cloneDefaults = () =>
    JSON.parse(JSON.stringify(defaults)) as LandingEditableContent;
  const [form, setForm] = useState<LandingEditableContent>(
    () => loadLandingOverrides() ?? cloneDefaults()
  );
  const [status, setStatus] = useState("");

  useEffect(() => {
    saveLandingDraft(form);
  }, [form]);

  const handleSave = () => {
    saveLandingOverrides(form);
    setStatus("Saved local landing override for this browser.");
  };

  const handleReset = () => {
    clearLandingOverrides();
    clearLandingDraft();
    setForm(cloneDefaults());
    setStatus("Reset complete. Landing override removed.");
  };

  const jsonText = JSON.stringify(form, null, 2);

  const handleDownload = () => {
    const blob = new Blob([jsonText], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "landing.override.json";
    anchor.click();
    URL.revokeObjectURL(url);
    setStatus("Downloaded landing.override.json");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonText);
      setStatus("Copied landing override JSON.");
    } catch {
      setStatus("Clipboard access failed. Use Download instead.");
    }
  };

  return (
    <AdminAccessGate scopeKey="landing" title="Landing Page Admin">
      {({ logout }) => (
        <div className="min-h-screen bg-gray-100">
          <div className="max-w-[1500px] mx-auto px-6 py-10">
            <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-6">
              <div className="rounded-2xl border bg-white p-6 md:p-8">
                <p className="text-xs font-semibold tracking-[0.14em] text-gray-500">
                  LANDING ADMIN
                </p>
                <h1 className="mt-2 text-3xl font-black text-gray-900">Landing Editor</h1>
                <p className="mt-3 text-sm text-gray-600">
                  Edit landing blocks. Preview updates while typing.
                </p>

                <section className="mt-8 rounded-xl border p-5">
                  <h2 className="text-lg font-bold text-gray-900">Hero Section</h2>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Eyebrow">
                      <input
                        value={form.hero.eyebrow}
                        onChange={(e) =>
                          setForm({ ...form, hero: { ...form.hero, eyebrow: e.target.value } })
                        }
                        className="w-full rounded-lg border px-3 py-2"
                      />
                    </Field>
                    <Field label="Primary Button Label">
                      <input
                        value={form.hero.primaryButtonLabel}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            hero: { ...form.hero, primaryButtonLabel: e.target.value },
                          })
                        }
                        className="w-full rounded-lg border px-3 py-2"
                      />
                    </Field>
                    <Field label="Title" className="md:col-span-2">
                      <textarea
                        value={form.hero.title}
                        onChange={(e) =>
                          setForm({ ...form, hero: { ...form.hero, title: e.target.value } })
                        }
                        className="h-20 w-full rounded-lg border px-3 py-2"
                      />
                    </Field>
                    <Field label="Description" className="md:col-span-2">
                      <textarea
                        value={form.hero.description}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            hero: { ...form.hero, description: e.target.value },
                          })
                        }
                        className="h-24 w-full rounded-lg border px-3 py-2"
                      />
                    </Field>
                    <Field label="Primary Button Href" className="md:col-span-2">
                      <input
                        value={form.hero.primaryButtonHref}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            hero: { ...form.hero, primaryButtonHref: e.target.value },
                          })
                        }
                        className="w-full rounded-lg border px-3 py-2"
                      />
                    </Field>
                  </div>
                </section>

                <section className="mt-6 rounded-xl border p-5">
                  <h2 className="text-lg font-bold text-gray-900">Mission & Vision</h2>
                  <BasicSectionEditor
                    data={form.sections.missionVision}
                    onChange={(next) =>
                      setForm({
                        ...form,
                        sections: { ...form.sections, missionVision: next },
                      })
                    }
                  />
                  <Field label="Mission Text" className="mt-4">
                    <textarea
                      value={form.sections.missionVision.missionText}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          sections: {
                            ...form.sections,
                            missionVision: {
                              ...form.sections.missionVision,
                              missionText: e.target.value,
                            },
                          },
                        })
                      }
                      className="h-20 w-full rounded-lg border px-3 py-2"
                    />
                  </Field>
                  <Field label="Vision Text" className="mt-4">
                    <textarea
                      value={form.sections.missionVision.visionText}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          sections: {
                            ...form.sections,
                            missionVision: {
                              ...form.sections.missionVision,
                              visionText: e.target.value,
                            },
                          },
                        })
                      }
                      className="h-20 w-full rounded-lg border px-3 py-2"
                    />
                  </Field>
                </section>

                <section className="mt-6 rounded-xl border p-5">
                  <h2 className="text-lg font-bold text-gray-900">Department Grid</h2>
                  <BasicSectionEditor
                    data={form.sections.departmentGrid}
                    onChange={(next) =>
                      setForm({
                        ...form,
                        sections: { ...form.sections, departmentGrid: next },
                      })
                    }
                  />
                  <Field label="Intro Text" className="mt-4">
                    <textarea
                      value={form.sections.departmentGrid.introText}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          sections: {
                            ...form.sections,
                            departmentGrid: {
                              ...form.sections.departmentGrid,
                              introText: e.target.value,
                            },
                          },
                        })
                      }
                      className="h-20 w-full rounded-lg border px-3 py-2"
                    />
                  </Field>
                </section>

                <NewsSectionEditor
                  data={form.sections.news}
                  onChange={(next) =>
                    setForm({ ...form, sections: { ...form.sections, news: next } })
                  }
                />

                <section className="mt-6 rounded-xl border p-5">
                  <h2 className="text-lg font-bold text-gray-900">Facilities</h2>
                  <BasicSectionEditor
                    data={form.sections.facilities}
                    onChange={(next) =>
                      setForm({ ...form, sections: { ...form.sections, facilities: next } })
                    }
                  />
                </section>

                <section className="mt-6 rounded-xl border p-5">
                  <h2 className="text-lg font-bold text-gray-900">Statistics</h2>
                  <BasicSectionEditor
                    data={form.sections.statistics}
                    onChange={(next) =>
                      setForm({ ...form, sections: { ...form.sections, statistics: next } })
                    }
                  />
                </section>

                <section className="mt-6 rounded-xl border p-5">
                  <h2 className="text-lg font-bold text-gray-900">Contact</h2>
                  <BasicSectionEditor
                    data={form.sections.contact}
                    onChange={(next) =>
                      setForm({ ...form, sections: { ...form.sections, contact: next } })
                    }
                  />
                </section>

                <FooterSectionEditor
                  data={form.sections.footer}
                  onChange={(next) =>
                    setForm({ ...form, sections: { ...form.sections, footer: next } })
                  }
                />

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="rounded-full bg-[#a90000] px-5 py-2 text-sm font-semibold text-white hover:bg-[#8f0000]"
                  >
                    Save Local Override
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="rounded-full border border-gray-400 px-5 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                  >
                    Download Override JSON
                  </button>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="rounded-full border border-gray-400 px-5 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                  >
                    Copy JSON
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-full border border-gray-400 px-5 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                  >
                    Reset Local Override
                  </button>
                  <button
                    type="button"
                    onClick={logout}
                    className="rounded-full border border-gray-400 px-5 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                  <Link
                    to="/"
                    className="rounded-full border border-gray-400 px-5 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                  >
                    View Landing Page
                  </Link>
                </div>

                {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
              </div>

              <ResizablePagePreview
                title="Live Preview"
                description="This is the actual landing page rendered in an iframe. It refreshes automatically while you type."
                previewUrl="/?preview=landing"
                liveToken={jsonText}
              />
            </div>
          </div>
        </div>
      )}
    </AdminAccessGate>
  );
}

function BasicSectionEditor<T extends BaseLandingSectionData>({
  data,
  onChange,
}: {
  data: T;
  onChange: (next: T) => void;
}) {
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <Field label="Section ID">
        <input
          value={data.id}
          onChange={(e) => onChange({ ...data, id: e.target.value })}
          className="w-full rounded-lg border px-3 py-2"
        />
      </Field>
      <Field label="Section Title">
        <input
          value={data.title}
          onChange={(e) => onChange({ ...data, title: e.target.value })}
          className="w-full rounded-lg border px-3 py-2"
        />
      </Field>
      <Field label="Assigned Group">
        <input
          value={data.assignedGroup}
          onChange={(e) => onChange({ ...data, assignedGroup: e.target.value })}
          className="w-full rounded-lg border px-3 py-2"
        />
      </Field>
      <Field label="Status Label">
        <input
          value={data.statusLabel}
          onChange={(e) => onChange({ ...data, statusLabel: e.target.value })}
          className="w-full rounded-lg border px-3 py-2"
        />
      </Field>
    </div>
  );
}

function NewsSectionEditor({
  data,
  onChange,
}: {
  data: NewsSectionData;
  onChange: (next: NewsSectionData) => void;
}) {
  const updateNewsItem = (index: number, updater: (item: NewsItem) => NewsItem) => {
    onChange({
      ...data,
      items: data.items.map((item, idx) => (idx === index ? updater(item) : item)),
    });
  };

  return (
    <section className="mt-6 rounded-xl border p-5">
      <h2 className="text-lg font-bold text-gray-900">News</h2>
      <BasicSectionEditor data={data} onChange={onChange} />

      <div className="mt-4 space-y-3">
        {data.items.map((item, idx) => (
          <div key={idx} className="grid grid-cols-12 gap-2 items-center">
            <input
              value={item.date}
              onChange={(e) => updateNewsItem(idx, (current) => ({ ...current, date: e.target.value }))}
              className="col-span-3 rounded-lg border px-3 py-2"
              placeholder="YYYY-MM-DD"
            />
            <input
              value={item.title}
              onChange={(e) => updateNewsItem(idx, (current) => ({ ...current, title: e.target.value }))}
              className="col-span-7 rounded-lg border px-3 py-2"
              placeholder="News title"
            />
            <button
              type="button"
              onClick={() => onChange({ ...data, items: data.items.filter((_, i) => i !== idx) })}
              className="col-span-2 rounded-lg border px-2 py-2 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange({ ...data, items: [...data.items, { date: "", title: "" }] })}
          className="rounded-lg border px-4 py-2 text-sm font-semibold"
        >
          Add News Item
        </button>
      </div>
    </section>
  );
}

function FooterSectionEditor({
  data,
  onChange,
}: {
  data: FooterSectionData;
  onChange: (next: FooterSectionData) => void;
}) {
  const updateLink = (index: number, updater: (item: FooterLink) => FooterLink) => {
    onChange({
      ...data,
      links: data.links.map((item, idx) => (idx === index ? updater(item) : item)),
    });
  };

  return (
    <section className="mt-6 rounded-xl border p-5">
      <h2 className="text-lg font-bold text-gray-900">Footer</h2>
      <BasicSectionEditor data={data} onChange={onChange} />

      <div className="mt-4 space-y-3">
        {data.links.map((link, idx) => (
          <div key={idx} className="grid grid-cols-12 gap-2 items-center">
            <input
              value={link.label}
              onChange={(e) =>
                updateLink(idx, (current) => ({ ...current, label: e.target.value }))
              }
              className="col-span-4 rounded-lg border px-3 py-2"
              placeholder="Link label"
            />
            <input
              value={link.href}
              onChange={(e) =>
                updateLink(idx, (current) => ({ ...current, href: e.target.value }))
              }
              className="col-span-6 rounded-lg border px-3 py-2"
              placeholder="/path or https://"
            />
            <button
              type="button"
              onClick={() => onChange({ ...data, links: data.links.filter((_, i) => i !== idx) })}
              className="col-span-2 rounded-lg border px-2 py-2 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange({ ...data, links: [...data.links, { label: "", href: "" }] })}
          className="rounded-lg border px-4 py-2 text-sm font-semibold"
        >
          Add Footer Link
        </button>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-1 block text-sm font-semibold text-gray-800">{label}</span>
      {children}
    </label>
  );
}
