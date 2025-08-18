# Plan for FadedImage Component

This plan outlines the steps to create a reusable React component named `FadedImage` with a linear gradient fade effect, as per the requirements.

## Component Details:
- **Name:** `FadedImage`
- **Type:** Functional React Component
- **Language:** TypeScript (.tsx)
- **Props:** `src` (string), `alt` (string)

## Styling Details:
- **File:** `FadedImage.css`
- **Effect:** Linear gradient fade from transparent on the left to opaque on the right.
- **Implementation:**
    - Use `mask-image` CSS property.
    - Use `-webkit-mask-image` for broader browser compatibility.
    - Apply a `linear-gradient` for the fade effect.
    - Include clear comments in the CSS explaining the properties.

## Steps:

1.  **Create `FadedImage.tsx`:**
    -   Define the `FadedImageProps` interface with `src` and `alt` properties.
    -   Create the functional `FadedImage` component that accepts these props.
    -   Render an `img` tag with the provided `src` and `alt`.
    -   Import the `FadedImage.css` file.

2.  **Create `FadedImage.css`:**
    -   Define CSS rules for the `FadedImage` component.
    -   Implement the `mask-image` property with a `linear-gradient` to achieve the fade effect (e.g., `linear-gradient(to right, transparent, black)`).
    -   Include the `-webkit-mask-image` equivalent for cross-browser compatibility.
    -   Add comments explaining the CSS properties used for the fade effect.

3.  **Review and Approval:**
    -   Ask the user to review this plan.

4.  **Switch to Code Mode:**
    -   Once the plan is approved, request to switch to "Code" mode to implement the component.