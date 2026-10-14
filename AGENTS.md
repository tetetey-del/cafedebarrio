<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the cafe as a single public route with anchor navigation because the requested experience is one scrolling page.
- Read products through a public server function and submit contacts through a shared Zod-validated server function using anonymous RLS-scoped clients; messages must never be publicly readable.
- Keep all visual tokens and cafe presentation styles in the global stylesheet and reference downloaded photography through asset JSON pointers for consistent styling and optimized hosting.
