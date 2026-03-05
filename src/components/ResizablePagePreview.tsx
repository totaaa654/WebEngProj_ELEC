import { useEffect, useState } from "react";

type ResizablePagePreviewProps = {
  title: string;
  description: string;
  previewUrl: string;
  liveToken?: string;
};

export default function ResizablePagePreview({
  title,
  description,
  previewUrl,
  liveToken,
}: ResizablePagePreviewProps) {
  const [width, setWidth] = useState(420);
  const [refreshNonce, setRefreshNonce] = useState(0);

  useEffect(() => {
    if (typeof liveToken === "undefined") return;

    const timer = window.setTimeout(() => {
      setRefreshNonce((n) => n + 1);
    }, 180);

    return () => window.clearTimeout(timer);
  }, [liveToken]);

  return (
    <aside className="xl:sticky xl:top-6 xl:self-start rounded-2xl border bg-white p-6">
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      <p className="mt-1 text-xs text-gray-500">{description}</p>

      <div className="mt-4 flex items-center gap-3">
        <label className="text-xs font-semibold text-gray-600">Width</label>
        <input
          type="range"
          min={320}
          max={900}
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          className="w-full"
        />
        <span className="text-xs text-gray-500 w-12 text-right">{width}px</span>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => setRefreshNonce((n) => n + 1)}
          className="rounded-lg border px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
        >
          Reload Preview
        </button>
        <a
          href={previewUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
        >
          Open Full Tab
        </a>
      </div>

      <div className="mt-4 overflow-auto rounded-xl border bg-white p-2">
        <div style={{ width }} className="mx-auto border rounded-lg overflow-hidden bg-white">
          <iframe
            key={`${previewUrl}-${refreshNonce}`}
            src={previewUrl}
            title="Page Preview"
            className="h-[760px] w-full"
          />
        </div>
      </div>
    </aside>
  );
}
