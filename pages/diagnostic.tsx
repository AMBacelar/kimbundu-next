import Layout from "../components/Layout";

const DiagnosticPage = () => {
  return (
    <Layout title="CSS Diagnostic Page">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-foreground">CSS Diagnostic Page</h1>
        
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">
            Card Component Test
          </h2>
          <p className="text-muted-foreground">
            If you can see this card with borders, shadows, and proper spacing,
            Tailwind CSS is working correctly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary text-primary-foreground p-4 rounded">
            Primary Color
          </div>
          <div className="bg-secondary text-secondary-foreground p-4 rounded">
            Secondary Color
          </div>
          <div className="bg-accent text-accent-foreground p-4 rounded">
            Accent Color
          </div>
        </div>

        <div className="space-y-2">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
            Primary Button
          </button>
          <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90 transition-colors ml-2">
            Secondary Button
          </button>
        </div>

        <div className="mt-8 p-4 bg-muted rounded">
          <h3 className="font-semibold mb-2">What to check:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Are there visible borders around the card?</li>
            <li>Is there proper spacing (padding, margins)?</li>
            <li>Are the colors showing correctly?</li>
            <li>Do the buttons have rounded corners?</li>
            <li>Is the grid layout working (3 columns on desktop)?</li>
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="font-semibold mb-2">Browser Console Check:</h3>
          <p className="text-sm text-muted-foreground">
            Open your browser's developer tools (F12) and check the Console tab
            for any CSS or PostCSS errors. Also check the Network tab to see if
            the CSS files are loading successfully.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default DiagnosticPage;
