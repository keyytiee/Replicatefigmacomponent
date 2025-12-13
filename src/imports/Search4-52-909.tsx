import svgPaths from "./svg-rq60eyspi8";
import imgUntitledDesign41 from "figma:asset/0f43c782522af7290a29a6e4387b4648c9fd1c0c.png";

function Sidebar() {
  return (
    <div className="absolute h-[133px] left-[420px] top-[314px] w-[21px]" data-name="Sidebar">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 133">
        <g id="Sidebar">
          <rect fill="var(--fill-0, #303030)" height="26" id="Rectangle 59" rx="6.5" stroke="var(--stroke-0, #303030)" width="20" x="0.5" y="54.5" />
          <line id="Line 10" stroke="var(--stroke-0, #303030)" strokeLinecap="round" strokeWidth="5" x1="7.5" x2="7.5" y1="2.5" y2="130.5" />
          <path d={svgPaths.p25a9b40} fill="var(--fill-0, #D9D9D9)" id="Polygon 1" stroke="var(--stroke-0, #303030)" />
        </g>
      </svg>
    </div>
  );
}

function StashFilter() {
  return (
    <div className="absolute left-[378px] size-[23px] top-[59px]" data-name="stash:filter">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
        <g id="stash:filter">
          <path d={svgPaths.p39941b80} fill="var(--fill-0, #303030)" fillOpacity="0.75" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SearchTransactions() {
  return (
    <div className="absolute contents left-[15px] top-[49px]" data-name="Search Transactions">
      <div className="absolute bg-[#d9d9d9] h-[44px] left-[15px] rounded-[12px] top-[49px] w-[397px]" />
      <div className="absolute aspect-[25/25] left-[6.78%] right-[89.02%] top-[calc(50%-392px)] translate-y-[-50%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <path d={svgPaths.p3568180} fill="var(--fill-0, #303030)" fillOpacity="0.75" id="Vector" />
        </svg>
      </div>
      <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[21px] leading-[normal] left-[62px] text-[14px] text-[rgba(48,48,48,0.75)] top-[60px] tracking-[-0.14px] w-[142px]">Search transactions</p>
      <StashFilter />
    </div>
  );
}

export default function Search() {
  return (
    <div className="bg-white relative size-full" data-name="Search 4">
      <div className="absolute h-[932px] left-[-2px] opacity-10 top-0 w-[431px]" data-name="Untitled design (4) 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledDesign41} />
      </div>
      <Sidebar />
      <SearchTransactions />
    </div>
  );
}