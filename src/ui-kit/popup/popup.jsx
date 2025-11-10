import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

/**
 * Popup component
 *
 * Props:
 * - isOpen (bool) - controls visibility
 * - onClose (func) - called to request close
 * - title (node|string) - optional header title
 * - children (node) - body content
 * - footer (node) - optional footer
 * - size ('sm'|'md'|'lg'|number) - width preset or px number
 * - closeOnBackdrop (bool) - close when backdrop clicked (default: true)
 * - showCloseButton (bool) - show top-right close button (default: true)
 * - className (string) - additional class names for the dialog
 */

const DEFAULT_SIZES = {
  sm: 360,
  md: 640,
  lg: 960,
};

function Popup({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnBackdrop = true,
  showCloseButton = true,
  className = "",
}) {
  const modalRef = useRef(null);
  const lastActiveElementRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Save previously focused element to restore later
    lastActiveElementRef.current = document.activeElement;

    // Lock body scroll
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus management - focus first focusable element or modal
    const focusFirst = () => {
      const el = modalRef.current;
      if (!el) return;
      const focusable = el.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length) {
        focusable[0].focus();
      } else {
        el.focus();
      }
    };
    focusFirst();

    const handleKey = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose?.();
      } else if (e.key === "Tab") {
        // simple focus trap
        const el = modalRef.current;
        if (!el) return;
        const focusable = Array.from(
          el.querySelectorAll(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKey, true);

    return () => {
      document.removeEventListener("keydown", handleKey, true);
      document.body.style.overflow = previousOverflow;
      // restore focus
      if (lastActiveElementRef.current && lastActiveElementRef.current.focus) {
        lastActiveElementRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const width =
    typeof size === "number" ? size : DEFAULT_SIZES[size] || DEFAULT_SIZES.md;

  const handleBackdropClick = (e) => {
    if (!closeOnBackdrop) return;
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  const modal = (
    <div
      role="dialog"
      aria-modal="true"
      className="ui-popup-backdrop"
      onMouseDown={handleBackdropClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(15, 23, 42, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        animation: "ui-popup-fade 160ms ease",
      }}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`ui-popup ${className}`}
        style={{
          width: Math.min(width, window.innerWidth - 40),
          maxHeight: "90vh",
          background: "#fff",
          borderRadius: 8,
          boxShadow:
            "0 10px 25px rgba(2,6,23,0.2), 0 2px 6px rgba(2,6,23,0.08)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          transform: "translateY(0)",
          animation: "ui-popup-slide 180ms cubic-bezier(.2,.9,.25,1)",
        }}
        aria-label={typeof title === "string" ? title : "Dialog"}
      >
        {(title || showCloseButton) && (
          <div
            className="ui-popup-header"
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid rgba(0,0,0,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#0f172a",
              }}
            >
              {title}
            </div>
            {showCloseButton && (
              <button
                type="button"
                onClick={() => onClose?.()}
                aria-label="Close"
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  padding: 6,
                  borderRadius: 6,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="#374151"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        <div
          className="ui-popup-body"
          style={{
            padding: 16,
            overflow: "auto",
            flex: 1,
          }}
        >
          {children}
        </div>

        {footer && (
          <div
            className="ui-popup-footer"
            style={{
              padding: "12px 16px",
              borderTop: "1px solid rgba(0,0,0,0.06)",
              display: "flex",
              gap: 8,
              justifyContent: "flex-end",
            }}
          >
            {footer}
          </div>
        )}
      </div>

      <style>
        {`
                    @keyframes ui-popup-fade { from { opacity: 0 } to { opacity: 1 } }
                    @keyframes ui-popup-slide { from { transform: translateY(6px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
                    .ui-popup button:focus { outline: 2px solid rgba(59,130,246,0.4); outline-offset: 2px; }
                `}
      </style>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
}

export default Popup;
