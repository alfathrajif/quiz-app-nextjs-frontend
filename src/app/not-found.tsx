export default async function NotFound() {
  return (
    <div className="wrapper">
      <div className="content-area flex items-center justify-center">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Page Not Found</h2>
          <p className="text-muted-foreground">
            Could not find requested resource
          </p>
        </div>
      </div>
    </div>
  );
}
