---
title: Docs
---

# Welcome to the MeasureMate Docs

Browse categories from the sidebar.

<!-- <a href="http://localhost:4001/admin/index.html#/collections/post" style="display:inline-block;margin-top:2rem;padding:0.5rem 1.2rem;background:var(--vp-c-brand);color:white;border-radius:6px;text-decoration:none;font-weight:600;">
  + New Post
</a> -->

<div id="admin-new-post" style="display:none;">
  <a href="/admin/index.html#/collections/post" target="_blank" style="display:inline-block;margin-top:2rem;padding:0.5rem 1.2rem;background:var(--vp-c-brand);color:white;border-radius:6px;text-decoration:none;font-weight:600;">
    + New Post
  </a>
</div>

<script>
  import { getAuth, onAuthStateChanged } from "firebase/auth";

  const allowedUsers = ["aryanadit1407@gmail.com"];

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user && allowedUsers.includes(user.email)) {
      const el = document.getElementById("admin-new-post");
      if (el) el.style.display = "block";
    }
  });
</script>