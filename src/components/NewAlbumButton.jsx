import useNewAlbumModal from "../hooks/useNewAlbumModal";

export default function NewAlbumButton() {
  const newAlbumModal = useNewAlbumModal();
  return (
    <div className="px-4">
      <button
        onClick={() => newAlbumModal.onOpen()}
        className="rounded-lg bg-black px-4 py-2 text-white hover:bg-black/80"
      >
        New Album
      </button>
    </div>
  );
}
