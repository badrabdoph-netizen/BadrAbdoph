import { useEffect, useMemo, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Check, Loader2, Pencil, X } from "lucide-react";

type EditableTextProps = {
  value?: string | null;
  fallback?: string;
  fallbackNode?: React.ReactNode;
  placeholder?: string;
  fieldKey: string;
  category: string;
  label: string;
  multiline?: boolean;
  className?: string;
  displayClassName?: string;
  editorClassName?: string;
  as?: keyof JSX.IntrinsicElements;
};

export function useInlineEditMode() {
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    setIsPreview(params.get("adminPreview") === "1");
  }, []);

  const statusQuery = trpc.adminAccess.status.useQuery(undefined, {
    enabled: isPreview,
    staleTime: 60_000,
  });

  return {
    enabled: isPreview && Boolean(statusQuery.data?.authenticated),
    loading: isPreview && statusQuery.isLoading,
  };
}

export function EditableText({
  value,
  fallback,
  fallbackNode,
  placeholder,
  fieldKey,
  category,
  label,
  multiline = false,
  className,
  displayClassName,
  editorClassName,
  as = "span",
}: EditableTextProps) {
  const { enabled } = useInlineEditMode();
  const utils = trpc.useUtils();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState("");

  const normalizedValue = value ?? "";
  const displayValue = normalizedValue || fallback || "";
  const showPlaceholder = !normalizedValue && !!placeholder;

  useEffect(() => {
    if (isEditing) return;
    setDraft(normalizedValue);
  }, [normalizedValue, isEditing]);

  const upsertMutation = trpc.siteContent.upsert.useMutation({
    onSuccess: () => {
      toast.success("تم حفظ النص");
      utils.siteContent.getAll.invalidate();
      setIsEditing(false);
    },
    onError: (error) => toast.error(error.message),
  });

  const startEditing = () => {
    if (!enabled) return;
    setDraft(normalizedValue || fallback || "");
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!enabled || upsertMutation.isPending) return;
    upsertMutation.mutate({
      key: fieldKey,
      value: draft,
      category,
      label,
    });
  };

  const handleCancel = () => {
    setDraft(normalizedValue);
    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      handleCancel();
      return;
    }
    if (!multiline && event.key === "Enter") {
      event.preventDefault();
      handleSave();
      return;
    }
    if (multiline && event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      handleSave();
    }
  };

  const Tag = as as keyof JSX.IntrinsicElements;

  return (
    <Tag className={cn("relative", className)}>
      {isEditing ? (
        <div className="space-y-2">
          {multiline ? (
            <Textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              className={cn("min-h-[110px]", editorClassName)}
              autoFocus
            />
          ) : (
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              className={editorClassName}
              autoFocus
            />
          )}
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" onClick={handleSave} disabled={upsertMutation.isPending}>
              {upsertMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin ml-2" />
              ) : (
                <Check className="w-4 h-4 ml-2" />
              )}
              حفظ
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel}>
              <X className="w-4 h-4 ml-2" />
              إلغاء
            </Button>
          </div>
          {multiline && (
            <div className="text-xs text-muted-foreground">
              للحفظ اضغط Ctrl + Enter
            </div>
          )}
        </div>
      ) : (
        <span
          className={cn(
            "inline-block",
            showPlaceholder ? "text-muted-foreground" : "text-inherit",
            enabled
              ? "cursor-text rounded-md outline outline-1 outline-dashed outline-transparent hover:outline-primary/40 transition"
              : "",
            displayClassName
          )}
          onClick={startEditing}
        >
          {normalizedValue ? (
            <span className="whitespace-pre-line">{normalizedValue}</span>
          ) : fallbackNode ? (
            fallbackNode
          ) : displayValue ? (
            <span className="whitespace-pre-line">{displayValue}</span>
          ) : (
            placeholder ?? ""
          )}
          {enabled && (
            <span className="ml-2 inline-flex items-center gap-1 text-[11px] text-muted-foreground">
              <Pencil className="w-3 h-3" />
              تعديل
            </span>
          )}
        </span>
      )}
    </Tag>
  );
}
