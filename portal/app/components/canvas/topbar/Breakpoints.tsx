import { useTranslation } from "react-i18next";
import { DesktopIcon, DotsVerticalIcon, LaptopIcon, MobileIcon } from "@radix-ui/react-icons";
import { includes, map, toUpper } from "lodash-es";
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/app/ui";
import { useBuilderProp, useCanvasWidth, useSelectedBreakpoints } from "../../../hooks";

interface BreakpointItemType {
  breakpoint: string;
  content: string;
  icon: any;
  title: string;
  width: number;
}

interface BreakpointCardProps extends BreakpointItemType {
  currentBreakpoint: string;
  onClick: Function;
}

const TabletIcon = ({ landscape = false }) => (
  <svg
    className={landscape ? "rotate-90" : ""}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 448 512"
    height="14px"
    width="14px"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M400 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM224 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm176-108c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V60c0-6.6 5.4-12 12-12h328c6.6 0 12 5.4 12 12v312z"></path>
  </svg>
);

const WEB_BREAKPOINTS: BreakpointItemType[] = [
  {
    title: "mobile_xs_title",
    content: "mobile_xs_content",
    breakpoint: "xs",
    icon: <MobileIcon />,
    width: 400,
  },
  {
    title: "mobile_sm_title",
    content: "mobile_sm_content",
    breakpoint: "sm",
    icon: <MobileIcon className="rotate-90" />,
    width: 640,
  },
  {
    title: "tablet_md_title",
    content: "tablet_md_content",
    breakpoint: "md",
    icon: <TabletIcon />,
    width: 800,
  },
  {
    title: "tablet_lg_title",
    content: "tablet_lg_content",
    breakpoint: "lg",
    icon: <TabletIcon landscape />,
    width: 1024,
  },
  {
    title: "desktop_xl_title",
    content: "desktop_xl_content",
    breakpoint: "xl",
    icon: <LaptopIcon />,
    width: 1420,
  },
  {
    title: "large_desktop_2xl_title",
    content: "large_desktop_2xl_content",
    breakpoint: "2xl",
    icon: <DesktopIcon />,
    width: 1920,
  },
];

const BreakpointCard = ({
  title,
  content,
  currentBreakpoint,
  breakpoint,
  width,
  icon,
  onClick,
}: BreakpointCardProps) => {
  const { t } = useTranslation();
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          onClick={() => onClick(width)}
          size="sm"
          variant={breakpoint === currentBreakpoint ? "secondary" : "ghost"}>
          {icon}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-52 border-border">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{t(title)}</h4>
            <p className="text-xs">{t(content)}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export const Breakpoints = () => {
  const [, breakpoint, setNewWidth] = useCanvasWidth();
  const [selectedBreakpoints, setSelectedBreakpoints] = useSelectedBreakpoints();
  const { t } = useTranslation();
  const breakpoints = useBuilderProp("breakpoints", WEB_BREAKPOINTS);

  const toggleBreakpoint = (newBreakPoint: string) => {
    if (selectedBreakpoints.includes(newBreakPoint)) {
      if (selectedBreakpoints.length > 2) {
        setSelectedBreakpoints(selectedBreakpoints.filter((bp) => bp !== newBreakPoint));
      }
    } else {
      setSelectedBreakpoints((prevSelected: string[]) => [...prevSelected, newBreakPoint]);
    }
  };

  if (breakpoints.length < 4) {
    return (
      <div className="flex items-center rounded-md">
        {map(breakpoints, (bp) => (
          <BreakpointCard {...bp} onClick={setNewWidth} key={bp.breakpoint} currentBreakpoint={breakpoint} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center rounded-md">
      {map(
        breakpoints.filter((bp: BreakpointItemType) => includes(selectedBreakpoints, toUpper(bp.breakpoint))),
        (bp: BreakpointItemType) => (
          <BreakpointCard {...bp} onClick={setNewWidth} key={bp.breakpoint} currentBreakpoint={breakpoint} />
        ),
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span className="cursor-pointer px-2.5 hover:opacity-80">
            <DotsVerticalIcon className="scale-90 transform" />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 border-border text-xs">
          <DropdownMenuLabel>{t("Breakpoints")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {map(breakpoints, (bp: BreakpointItemType) => (
            <DropdownMenuCheckboxItem
              key={bp.breakpoint}
              disabled={bp.breakpoint === "xs"}
              onCheckedChange={() => toggleBreakpoint(toUpper(bp.breakpoint))}
              checked={includes(selectedBreakpoints, toUpper(bp.breakpoint))}>
              {t(bp.title)}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
