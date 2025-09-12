import { Badge } from "@/components/ui/badge";

const SectionTitleSubTitle = (props) => {
  return (
    <div className="my-4 text-foreground">
      <div className="flex gap-2 items-center">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-foreground">{props.title}</h3>
        {props.badge && (
          <Badge variant="secondary" className="inline">
            {props.badge}
          </Badge>
        )}
      </div>
      <p className="leading-7 text-muted-foreground/60">{props.subtitle}</p>
    </div>
  );
};

export default SectionTitleSubTitle;
