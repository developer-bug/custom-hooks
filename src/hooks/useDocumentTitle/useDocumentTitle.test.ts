import { renderHook } from "@testing-library/react-hooks";
import useDocumentTitle from "./useDocumentTitle";

describe("useDocumentTitle Hook", () => {
    afterEach(() => {
        // Reset document title after each test
        document.title = "Default Title";
    });

    it("should set the document title to the provided title", () => {
        renderHook(() => useDocumentTitle("My Page Title"));
        expect(document.title).toBe("My Page Title");
    });

    it("should not update the document title if the title includes 'undefined'", () => {
        document.title = "Initial Title";
        renderHook(() => useDocumentTitle("undefined title"));
        expect(document.title).toBe("Initial Title"); // Title should remain unchanged
    });

    it("should not update the document title if the title includes 'Undefined' (case-insensitive)", () => {
        document.title = "Initial Title";
        renderHook(() => useDocumentTitle("Another Undefined Title"));
        expect(document.title).toBe("Initial Title"); // Title should remain unchanged
    });

    it("should update the document title only when title changes", () => {
        const { rerender } = renderHook((title) => useDocumentTitle(title), {
            initialProps: "Initial Title",
        });
        expect(document.title).toBe("Initial Title");

        // Re-render with a different title
        rerender("Updated Title");
        expect(document.title).toBe("Updated Title");

        // Re-render with the same title (no change)
        rerender("Updated Title");
        expect(document.title).toBe("Updated Title");
    });
});
