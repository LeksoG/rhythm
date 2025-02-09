import { Button } from 'D:\music\rhythm\src\Playlist.js'; // Adjust the path as needed
import { Plus, Search, X, MoreVertical, Trash, Edit, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function Playlist() {
  const [playlists, setPlaylists] = useState([]);
  const [search, setSearch] = useState("");
  const [showCreateUI, setShowCreateUI] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState({ name: "", cover: "", description: "", songs: [] });
  const [preview, setPreview] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [showOptions, setShowOptions] = useState(null);
  const [showEditUI, setShowEditUI] = useState(false);
  const [editPlaylist, setEditPlaylist] = useState(null);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [sortMenuVisible, setSortMenuVisible] = useState(false);
  const [sortOption, setSortOption] = useState(null);
  const [viewPlaylist, setViewPlaylist] = useState(null);
  const [isViewingPlaylist, setIsViewingPlaylist] = useState(false);
  const [backwardSlide, setBackwardSlide] = useState(false);
  const optionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(null);
        setSortMenuVisible(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setNewPlaylist({ ...newPlaylist, cover: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const createPlaylist = () => {
    if (newPlaylist.name) {
      setPlaylists([...playlists, { ...newPlaylist, id: Date.now() }]);
      setShowCreateUI(false);
      setNewPlaylist({ name: "", cover: "", description: "", songs: [] });
      setPreview(null);
    }
  };

  const handleEditPlaylist = () => {
    setPlaylists(
      playlists.map((playlist) =>
        playlist.id === editPlaylist.id
          ? { ...playlist, name: editPlaylist.name, cover: editPlaylist.cover, description: editPlaylist.description }
          : playlist
      )
    );
    setShowEditUI(false);
  };

  const handleDeletePlaylist = (playlistId) => {
    setPlaylists(playlists.filter(playlist => playlist.id !== playlistId));
    setShowDeleteWarning(false); // Close warning dialog
  };

  const sortPlaylists = (type) => {
    let sorted;
    switch (type) {
      case "asc":
        sorted = [...playlists].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "desc":
        sorted = [...playlists].sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "year":
        sorted = [...playlists].sort((a, b) => a.year - b.year); // assuming 'year' exists
        break;
      case "date":
        sorted = [...playlists].sort((a, b) => a.date - b.date); // assuming 'date' exists
        break;
      default:
        sorted = playlists;
    }
    setPlaylists(sorted);
    setSortMenuVisible(false); // Close the dropdown
  };

  const clearSearch = () => {
    setSearch("");
  };

  const handleViewPlaylist = (playlist) => {
    setIsViewingPlaylist(true);
    setViewPlaylist(playlist);
    setBackwardSlide(false);
  };

  const handleGoBack = () => {
    setBackwardSlide(true);
    setTimeout(() => {
      setIsViewingPlaylist(false);
      setViewPlaylist(null);
    }, 300); // Match the slide animation duration
  };

  return (
    <div className={`p-6 bg-gray-900 min-h-screen text-white relative ${isViewingPlaylist ? "overflow-hidden" : ""}`}>
      {isViewingPlaylist ? (
        <motion.div
          key="viewPlaylist"
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className={`absolute inset-0 bg-gray-900 p-6 text-white overflow-auto ${backwardSlide ? "exit-slide" : ""}`}
        >
          <div className="flex items-center mb-6">
            <Button onClick={handleGoBack} className="bg-gray-700 hover:bg-gray-600 text-white mr-4">
              Back
            </Button>
            <h2 className="text-2xl font-bold">{viewPlaylist.name}</h2>
          </div>
          <div className="flex flex-col items-center mb-6">
            <img
              src={viewPlaylist.cover}
              alt={viewPlaylist.name}
              className="w-32 h-32 object-cover rounded-md mb-4"
            />
            <p className="text-gray-400 mb-4">{viewPlaylist.description}</p>
          </div>
          <div className="flex gap-4">
            <Button className="bg-red-600 hover:bg-red-700">Add Song</Button>
          </div>
        </motion.div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-100">Your Playlists</h2>
            <div className="flex gap-2 items-center">
              <div className="relative">
                <Search className="absolute left-2 top-2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-gray-800 text-white pl-8 py-2 rounded-md focus:outline-none"
                />
                {search && (
                  <X
                    onClick={clearSearch}
                    className="absolute right-2 top-2 text-gray-400 cursor-pointer"
                    size={18}
                  />
                )}
              </div>
              <Button onClick={() => setShowCreateUI(true)} className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-1 rounded-md py-2 px-4">
                <Plus size={18} /> Create Playlist
              </Button>
            </div>
          </div>

          {/* Sort Button */}
          <div className="relative mb-4">
            <Button
              onClick={() => setSortMenuVisible(!sortMenuVisible)}
              className="bg-gray-600 hover:bg-gray-700 flex items-center gap-2 px-3 py-2 rounded-md"
            >
              Sort {sortOption && `(${sortOption})`} <ChevronDown size={18} />
            </Button>
            {sortMenuVisible && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute top-10 left-0 bg-gray-800 rounded-md shadow-md w-40 p-2"
              >
                <Button
                  onClick={() => { sortPlaylists("asc"); setSortOption("A-Z"); }}
                  className="w-full text-white hover:bg-gray-700 mb-1"
                >
                  A-Z
                </Button>
                <Button
                  onClick={() => { sortPlaylists("desc"); setSortOption("Z-A"); }}
                  className="w-full text-white hover:bg-gray-700 mb-1"
                >
                  Z-A
                </Button>
                <Button
                  onClick={() => { sortPlaylists("year"); setSortOption("Year"); }}
                  className="w-full text-white hover:bg-gray-700 mb-1"
                >
                  Year
                </Button>
                <Button
                  onClick={() => { sortPlaylists("date"); setSortOption("Date"); }}
                  className="w-full text-white hover:bg-gray-700"
                >
                  Date
                </Button>
              </motion.div>
            )}
          </div>

          {showCreateUI && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-md"
            >
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-96 text-white">
                <h3 className="text-lg font-semibold mb-4">Create Playlist</h3>
                <input
                  type="text"
                  value={newPlaylist.name}
                  onChange={(e) => setNewPlaylist({ ...newPlaylist, name: e.target.value })}
                  className="w-full p-2 bg-gray-700 rounded-md mb-3 text-white focus:outline-none"
                  placeholder="Playlist Name"
                />
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="w-full mb-3"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                )}
                <textarea
                  value={newPlaylist.description}
                  onChange={(e) => setNewPlaylist({ ...newPlaylist, description: e.target.value })}
                  className="w-full p-2 bg-gray-700 rounded-md mb-3 text-white focus:outline-none"
                  placeholder="Playlist Description"
                />
                <div className="flex gap-4">
                  <Button onClick={createPlaylist} className="bg-green-500 hover:bg-green-600 w-full">Create</Button>
                  <Button onClick={() => setShowCreateUI(false)} className="bg-gray-600 hover:bg-gray-700 w-full">Cancel</Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Playlist Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {playlists.map((playlist) => (
              <motion.div
                key={playlist.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800 rounded-md overflow-hidden shadow-md relative"
              >
                <img
                  src={playlist.cover}
                  alt={playlist.name}
                  className="w-full h-32 object-cover rounded-t-md"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{playlist.name}</h3>
                  <p className="text-gray-400 text-sm">{playlist.description}</p>
                </div>
                <div className="absolute top-2 right-2 text-white cursor-pointer" onClick={() => setShowOptions(playlist.id)}>
                  <MoreVertical size={18} />
                </div>

                {showOptions === playlist.id && (
                  <div
                    ref={optionsRef}
                    className="absolute top-10 right-2 bg-gray-700 rounded-md shadow-lg w-40 p-2"
                  >
                    <Button
                      onClick={() => setEditPlaylist(playlist) && setShowEditUI(true)}
                      className="w-full text-white hover:bg-gray-600 mb-1"
                    >
                      <Edit size={16} /> Edit
                    </Button>
                    <Button
                      onClick={() => setShowDeleteWarning(true)}
                      className="w-full text-red-500 hover:bg-red-600"
                    >
                      <Trash size={16} /> Delete
                    </Button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
