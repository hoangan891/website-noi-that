name: Frontend UI Redesign
summary: Helps plan and implement a new frontend web interface for the React/Tailwind e-commerce app.

## When to use this skill
Use this skill when you want to change the website look and feel in the frontend portion of the project, especially for pages, layout, styling, and component appearance.

## Goal
Guide the user through creating a redesigned frontend interface in the `frontend` app by:
- clarifying the new visual direction,
- locating the existing React/Tailwind UI structure,
- choosing the right pages/components to update,
- implementing layout and style changes,
- verifying responsive behavior and build success.

## Workflow
1. Ask the user what visual style or interface changes they want.
   - Example: modern product cards, different color palette, new header/footer layout, alternative category grid, or a custom brand theme.
2. Review the current frontend structure and key UI files.
   - Focus on `frontend/src/pages`, `frontend/src/components`, `frontend/src/assets`, and `frontend/src/index.css`.
3. Map the redesign to specific UI targets.
   - Choose which pages or components need change: `Home`, `ProductList`, `ProductDetail`, `Cart`, `Admin` pages, header, footer, buttons, etc.
4. Decide style rules and component updates.
   - Prefer Tailwind utility classes, existing reusable components, and theme tokens from `frontend/src/theme.js`.
   - Keep changes responsive and consistent across screen sizes.
5. Apply the changes in code.
   - Update JSX layout, Tailwind class names, component props, and shared style utilities.
   - Add or modify images, icons, spacing, borders, typography, and color variables as needed.
6. Validate the redesign.
   - Ensure the app builds successfully.
   - Confirm key pages render correctly and the new UI is consistent.

## Decision points
- If the user only wants a color/theme refresh, adjust shared theme and utility classes.
- If the user wants a layout redesign, update page templates and component compositions.
- If the user wants a new UI pattern, create or extend reusable components instead of editing many isolated files.
- If the user requests a specific style reference, ask for one image, URL, or a short description.

## Quality criteria
- Changes are implemented in the `frontend` directory only.
- New UI follows the user's requested look/feel.
- Existing functionality is preserved.
- Layout remains responsive for desktop and mobile.
- Code changes are clear and maintainable.

## Example prompts
- "Thiết kế lại giao diện trang chủ và danh sách sản phẩm theo phong cách hiện đại tối giản."
- "Đổi palette màu và kiểu thẻ sản phẩm trên frontend."
- "Tạo lại header và footer với khoảng cách lớn hơn và font đậm."

## Next step
Ask for the desired new frontend appearance, target pages, and whether the redesign should be subtle or completely new.