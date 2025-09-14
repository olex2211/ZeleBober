
import SideBar from "../components/SideBar/SideBar";
import SearchFeed from "../components/SearchFeed/SearchFeed.jsx";

export default function SearchPage() {

    return (
      <>
        <main className="main-container flex flex-row min-h-full overflow-hidden">
          <SideBar search/>
          <div className="search-container flex flex-col flex-1 h-full pr-[16%] overflow-hidden">
            <SearchFeed/>
          </div>
        </main>
      </>
    );
}