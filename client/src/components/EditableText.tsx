import * as React from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { useEditMode } from "@/contexts/EditModeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Pencil, Save, X } from "lucide-react";
import { cn } from "@/lib/utils";

type EditableTextProps = {
  /** DB key in `site_content.key` */
  contentKey: string;
  /** Fallback value if DB doesn't have a value yet */
  fallback: string;
  /** For admin save (stored in DB) */
  category: string;
  /** Human-friendly label (stored in DB) */
  label?: string;
  /** Render tag */
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  /** If true, editing uses a Textarea and render keeps newlines. */
  multiline?: boolean;
  /** Defaults to rtl */
  dir?: "rtl" | "ltr";
};

export default function EditableText({
  contentKey,
  fallback,
  category,
  label,
  as = "span",
  className,
  style,
  multiline = false,
  dir = "rtl",
}: EditableTextProps) {
  const Component = as as any;
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const { editMode } = useEditMode();

  const contentQuery = trpc.siteContent.getByKey.useQuery(
    { key: contentKey },
    { staleTime: 30_000 }
  );

  const upsertMutation = trpc.siteContent.upsert.useMutation({
    onSuccess: () => {
      toast.success("تم حفظ التعديل");
    },
    onError: (err) => {
      toast.error(err.message || "حصل خطأ أثناء الحفظ");
    },
  });

  const saved = contentQuery.data?.value;
  const value = (saved && saved.trim().length > 0 ? saved : fallback) ?? "";

  const [isEditing, setIsEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(value);

  // Keep local state in sync when DB value changes.
  React.useEffect(() => {
    if (!isEditing) {
      setDraft(value);
    }
  }, [value, isEditing]);

  const save = React.useCallback(async () => {
    if (!isAdmin) return;

    const next = draft ?? "";
    await upsertMutation.mutateAsync({
      key: contentKey,
      value: next,
      category,
      label,
    });

    await contentQuery.refetch();
    setIsEditing(false);
  }, [category, contentKey, draft, isAdmin, label, upsertMutation, contentQuery]);

  const cancel = React.useCallback(() => {
    setDraft(value);
    setIsEditing(false);
  }, [value]);

  // Normal mode (or non-admin): just render text.
  if (!isAdmin || !editMode) {
    return (
      <Component
        className={cn(className, multiline ? "whitespace-pre-line" : undefined)}
        style={style}
        dir={dir}
      >
        {value}
      </Component>
    );
  }

  // Admin + Edit mode
  return (
    <span
      className={cn(
        "relative max-w-full group",
        multiline ? "block" : "inline-block"
      )}
      dir={dir}
    >
      {!isEditing ? (
        <>
          <Component
            role="button"
            tabIndex={0}
            onClick={() => setIsEditing(true)}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") setIsEditing(true);
            }}
            className={cn(
              className,
              multiline ? "whitespace-pre-line" : undefined,
              "cursor-pointer",
              "outline-none focus:ring-2 focus:ring-primary/60 rounded-sm",
              "hover:bg-primary/5",
              "border border-dashed border-primary/30 hover:border-primary/60",
              "px-1 py-0.5"
            )}
            style={style}
            title="اضغط للتعديل"
          >
            {value}
          </Component>

          <span className="absolute -top-3 right-0 inline-flex items-center gap-1 text-[11px] text-primary/80 opacity-0 group-hover:opacity-100 transition-opacity">
            <Pencil className="w-3 h-3" />
            تعديل
          </span>
        </>
      ) : (
        <span className="block border border-primary/40 rounded-md p-2 bg-background/80 backdrop-blur-sm">
          <div className="space-y-2">
            {multiline ? (
              <Textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={Math.min(8, Math.max(2, (draft?.split("\n").length ?? 2) + 1))}
                className="bg-background"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Escape") cancel();
                  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") save();
                }}
              />
            ) : (
              <Input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="bg-background"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Escape") cancel();
                  if (e.key === "Enter") save();
                }}
              />
            )}

            <div className="flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={cancel}
                disabled={upsertMutation.isPending}
              >
                <X className="w-4 h-4 ml-1" />
                إلغاء
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={save}
                disabled={upsertMutation.isPending}
              >
                <Save className="w-4 h-4 ml-1" />
                {upsertMutation.isPending ? "جاري الحفظ..." : "حفظ"}
              </Button>
            </div>
          </div>
        </span>
      )}
    </span>
  );
}
