import svgPaths from "./svg-7xps7bhzz9";
import imgUntitledDesign41 from "figma:asset/0f43c782522af7290a29a6e4387b4648c9fd1c0c.png";

function Sidebar() {
  return (
    <div className="css-roiesn h-[133px] left-[420px] top-[314px] w-[21px]" data-name="Sidebar">
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
    <div className="css-roiesn left-[378px] size-[23px] top-[59px]" data-name="stash:filter">
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
    <div className="css-bz2tic left-[15px] top-[49px]" data-name="Search Transactions">
      <div className="bg-[#d9d9d9] css-38e4n h-[44px] left-[15px] top-[49px] w-[397px]" />
      <div className="css-6aa2en css-roiesn left-[6.78%] right-[89.02%] top-[calc(50%-392px)]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <path d={svgPaths.p3568180} fill="var(--fill-0, #303030)" fillOpacity="0.75" id="Vector" />
        </svg>
      </div>
      <p className="css-2tgrs css-qblnjq css-tzn6qh h-[21px] left-[62px] text-[rgba(48,48,48,0.75)] top-[60px] w-[142px]">Search transactions</p>
      <StashFilter />
    </div>
  );
}

export default function Search() {
  return (
    <div className="bg-white css-vf8mzy size-full" data-name="Search 4">
      <div className="css-2b16l6 css-roiesn h-[932px] left-[-2px] top-0 w-[431px]" data-name="Untitled design (4) 1">
        <img alt="" className="css-5eam1e css-9unj7x css-trglf0 inset-0 max-w-none size-full" src={imgUntitledDesign41} />
      </div>
      <Sidebar />
      <SearchTransactions />
    </div>
  );
}