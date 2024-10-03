import { ShuffleIcon, SmileIcon } from "lucide-react";
import { ArrowDownIcon, ArrowUpIcon, CheckIcon } from "@radix-ui/react-icons";
import { FaFilePen } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/ui";
import { useAskAi } from "../hooks/useAskAi";
import { FaRecycle } from "react-icons/fa";

const QUICK_PROMPTS = [
  {
    name: "Improve writing",
    icon: FaFilePen,
    prompt: "Improving writing in all text elements. Replacing placeholder content with meaningful relevant content.",
  },
  {
    name: "Replace placeholder content",
    icon: FaRecycle,
    prompt: "Discard current placeholder content and replace with meaningful relevant content.",
  },
  // {
  //   name: "Change tone",
  //   icon: MegaphoneIcon,
  //   subMenus: ["joyful", "serious", "angry", "sad", "excited", "relaxed", "confident", "assertive", "polite"],
  //   prompt: "Change tone in all text elements. Rewrite all text elements in a more _TONE_ tone.",
  // },
  {
    name: "Fix grammar",
    icon: CheckIcon,
    prompt: "Fix grammar in all text elements. Ensuring the text is grammatically correct and free of errors.",
  },
  // {
  //   name: "Translate",
  //   icon: GlobeIcon,
  //   subMenus: ["English", "Spanish", "French", "German", "Italian", "Portuguese", "Chinese", "Japanese", "Korean"],
  //   prompt: "Translate all text elements to a __LANG__ language.",
  // },
  {
    name: "Make longer",
    icon: ArrowUpIcon,
    prompt: "Make all text elements longer.",
  },
  {
    name: "Make shorter",
    icon: ArrowDownIcon,
    prompt: "Make all text elements shorter.",
  },
  {
    name: "Add emojis",
    icon: SmileIcon,
    prompt: "Add emojis to text elements if relevant.",
  },
  {
    name: "Randomize",
    icon: ShuffleIcon,
    prompt: "Randomize all text elements.",
  },
];

export function QuickPrompts({ onClick }: { onClick: (prompt: string) => void }) {
  const { loading } = useAskAi();
  return (
    <div className={loading ? "pointer-events-none opacity-50" : ""}>
      <ul className="space-y-2">
        {QUICK_PROMPTS.map(({ name, icon: Icon, subMenus, prompt }: any) =>
          subMenus ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <li className="flex cursor-pointer items-center space-x-2 hover:bg-gray-100" key={name}>
                  <Icon className="h-4 w-4" />
                  <span>{name}</span>
                </li>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <li
              onClick={() => onClick(prompt)}
              className="flex cursor-pointer items-center space-x-2 rounded p-1 pl-2 text-sm hover:bg-gray-100"
              key={name}>
              <Icon className="h-4 w-4" />
              <span>{name}</span>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
