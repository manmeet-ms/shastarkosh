import { IconHeart, IconMessageCircle, IconShare3 } from "@tabler/icons-react";
import { Link, useNavigate } from "@tanstack/react-router";
import millify from "millify";

const ResourceMaterialCard = (props) => {
  const navigate = useNavigate();
  return (
    <div className="  bg-card   border-2  rounded-lg overflow-hidden">
      <div className="relative">
        <Link to={`/app/resources/r/${props.id}`}>
          <img className=" lg:h-48 md:h-36 h-36 w-full object-cover object-center" src={props.mainImage} alt="blog" />
        </Link>
        <span
          onClick={() => {
            window.navigator.share({ title: props.title, text: props.content, url: `https://shastarkosh.com/app/posts/p/${props._id}` });
          }}
          className="bg-primary  hover:bg-primary/80 backdrop-blur-md transition-colors ease-in-out duration-100  p-2  absolute top-4 right-2 z-10 hover:bg-accent  text-foreground rounded-full flex items-center text gap-0.5 justify-start text-sm ">
          <IconShare3 size={18} />
        </span>
      </div>
      <div className="p-6">
        <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">{props?.category}</h2>
        <Link to={`/app/resources/r/${props.id}`}>
          <h2 className=" hover:underline title-font font-medium text-lg text-foreground capitalize truncate">{props.title}</h2>
        </Link>

        <p className="leading-relaxed text-muted-foreground line-clamp-3 mb-3">{props.description}</p>
        <div className="flex items-center flex-wrap ">
          {/* <Link to={`/resources/${props.id}`} className="text-purple-400 inline-flex items-center md:mb-2 lg:mb-0">Learn More
    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
     <path d="M5 12h14"></path>
     <path d="M12 5l7 7-7 7"></path>
    </svg>
    </Link> */}
          <div className="flex relative right-1 justify-between container items-center ">
            {" "}
            <div className="flex">
              <span className="px-2 hover:bg-accent py-1 text-foreground rounded-full flex items-center gap-0.5 justify-start text-sm ">
                <IconHeart size={18} /> {millify(props.likes)}
              </span>
              {/* <span className="px-2 hover:bg-accent py-1 text-foreground rounded-full flex items-center gap-0.5 justify-start text-sm ">
                  <IconThumbDown size={18} /> {millify(props.likes)}
                </span> */}
              <span onClick={() => navigate({ to: `/app/resources/r/${props.id}` })} className="px-2 hover:bg-accent py-1 text-foreground rounded-full flex items-center text gap-0.5 justify-start text-sm ">
                <IconMessageCircle size={18} /> {millify(props.likes)}
              </span>
            </div>
            <Link to={`/app/resources/r/${props.id}`} className="text-sm text-primary font-medium border-b border-dashed border-primary/60  pb-0.25 truncate">
              Read More{" "}
            </Link>
            {/* <span className="px-2 hover:bg-accent py-1 text-foreground rounded-full flex items gap-0.5 justify-start text-sm ">
                <IconEye size={18} /> {millify(props.likes)}
              </span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceMaterialCard;
