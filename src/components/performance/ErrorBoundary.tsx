"use client";

import React, { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError?.(error, errorInfo);
    if (typeof window !== "undefined" && (window as any).va) {
      (window as any).va("track", "error_boundary", {
        message: error.message,
        componentStack: errorInfo.componentStack,
      });
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div
          className="flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-lg border border-red-500/20 bg-red-500/5 p-8 text-center"
          role="alert"
        >
          <p className="text-sm font-medium text-red-400">Something went wrong</p>
          <p className="text-xs text-muted-foreground max-w-md">
            {this.state.error?.message ?? "An unexpected error occurred"}
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="rounded-md border border-white/20 px-4 py-2 text-sm hover:bg-white/5"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
