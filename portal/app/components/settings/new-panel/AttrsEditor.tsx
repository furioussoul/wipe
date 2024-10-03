"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Label, Textarea } from "@/app/ui";
import { Edit2, X } from "lucide-react";

type Attribute = {
  key: string;
  value: string;
};

interface AttributeManagerProps {
  preloadedAttributes?: Attribute[];
  onAttributesChange?: (attributes: Attribute[]) => void;
}

export default React.memo(function Component({ preloadedAttributes = [], onAttributesChange }: AttributeManagerProps) {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [error, setError] = useState("");
  const keyInputRef = useRef<HTMLInputElement>(null);
  const valueTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (keyInputRef.current) {
      keyInputRef.current.focus();
    }
  }, [attributes]);

  useEffect(() => {
    setAttributes(preloadedAttributes);
  }, [preloadedAttributes]);

  const addAttribute = () => {
    if (newKey.startsWith("@")) {
      setError("Attribute keys cannot start with '@'");
      return;
    }
    if (newKey) {
      const newAttributes = [...attributes, { key: newKey, value: newValue }];
      onAttributesChange(newAttributes);
      setAttributes(attributes);
      setNewKey("");
      setNewValue("");
      setError("");
    }
  };

  const removeAttribute = (index: number) => {
    const newAttributes = attributes.filter((_, i) => i !== index);
    onAttributesChange(newAttributes);
    setAttributes(newAttributes);
  };

  const startEdit = (index: number) => {
    setEditIndex(index);
    setNewKey(attributes[index].key);
    setNewValue(attributes[index].value);
  };

  const saveEdit = () => {
    if (newKey.startsWith("@")) {
      setError("Attribute keys cannot start with '@'");
      return;
    }
    if (editIndex !== null && newKey) {
      const newAttributes = [...attributes];
      newAttributes[editIndex] = { key: newKey, value: newValue };
      onAttributesChange(newAttributes);
      setAttributes(newAttributes);
      setEditIndex(null);
      setNewKey("");
      setNewValue("");
      setError("");
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      editIndex !== null ? saveEdit() : addAttribute();
    }
  };

  return (
    <div className={"max-w-full"}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editIndex !== null ? saveEdit() : addAttribute();
        }}
        className="space-y-3">
        <div className="flex flex-col">
          <div className="w-full">
            <Label htmlFor="attrKey" className="text-xs">
              Key
            </Label>
            <Input
              autoCapitalize={"off"}
              autoCorrect={"off"}
              spellCheck={"false"}
              id="attrKey"
              ref={keyInputRef}
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              placeholder="Key"
              className="h-8 text-sm"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="attrValue" className="text-xs">
              Value
            </Label>
            <Textarea
              autoCapitalize={"off"}
              autoCorrect={"off"}
              spellCheck={"false"}
              id="attrValue"
              rows={2}
              ref={valueTextareaRef}
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Value"
              className="bg-background text-sm"
            />
          </div>
        </div>
        <Button type="submit" variant="secondary" className="h-8 w-fit text-sm">
          {editIndex !== null ? "Save" : "Add"}
        </Button>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </form>

      <div className="mt-4 space-y-1 overflow-y-auto">
        {attributes.map((attr, index) => (
          <div key={index} className="flex items-center justify-between rounded bg-muted p-1.5 text-sm">
            <div className="mr-2 flex flex-col">
              <span className="truncate font-semibold">{attr.key}</span>
              <span className="text-wrap max-w-[200px] text-muted-foreground">{attr.value.toString()}</span>
            </div>
            <div className="flex-shrink-0">
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => startEdit(index)}>
                <Edit2 className="h-3 w-3" />
                <span className="sr-only">Edit attribute</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeAttribute(index)}>
                <X className="h-3 w-3" />
                <span className="sr-only">Remove attribute</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
