import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service like Sentry here
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload(); // Or navigate to home
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <style>{`
            .error-container {
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              background: #0a0a0a;
              color: #ffffff;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              padding: 20px;
            }

            .error-card {
              max-width: 500px;
              width: 100%;
              padding: 40px;
              background: rgba(255, 255, 255, 0.03);
              border: 1px solid rgba(255, 255, 255, 0.1);
              border-radius: 24px;
              backdrop-filter: blur(12px);
              text-align: center;
              box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
            }

            .error-icon {
              font-size: 50px;
              margin-bottom: 20px;
              display: inline-block;
              background: linear-gradient(135deg, #ff4b2b, #ff416c);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }

            h1 {
              font-size: 24px;
              margin-bottom: 12px;
              font-weight: 700;
            }

            p {
              color: #a0a0a0;
              line-height: 1.6;
              margin-bottom: 30px;
            }

            .btn-retry {
              background: #ffffff;
              color: #000000;
              border: none;
              padding: 12px 32px;
              border-radius: 12px;
              font-weight: 600;
              cursor: pointer;
              transition: transform 0.2s, opacity 0.2s;
            }

            .btn-retry:hover {
              transform: translateY(-2px);
              opacity: 0.9;
            }

            .details-box {
              margin-top: 30px;
              text-align: left;
              font-size: 12px;
              color: #666;
            }

            details summary {
              cursor: pointer;
              outline: none;
              margin-bottom: 10px;
            }

            pre {
              background: #1a1a1a;
              padding: 15px;
              border-radius: 8px;
              overflow-x: auto;
              color: #ff4b2b;
              border: 1px solid #333;
            }
          `}</style>

          <div className="error-card">
            <span className="error-icon">✕</span>
            <h1>Something went wrong</h1>
            <p>
              An unexpected error occurred. We've been notified and are looking into it. 
              In the meantime, try refreshing the page.
            </p>
            
            <button className="btn-retry" onClick={this.handleReset}>
              Refresh Page
            </button>

            {/* Technical Details (Useful for development) */}
            <div className="details-box">
              <details>
                <summary>View Technical Details</summary>
                <pre>
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;