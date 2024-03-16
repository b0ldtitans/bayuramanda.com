export default function LoadingDots() {
  return (
    <div className="flex items-center justify-center h-screen space-x-2 ">
      <span className="sr-only">Loading...</span>
      <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="h-4 w-4 bg-black rounded-full animate-bounce" />
    </div>
  );
}
