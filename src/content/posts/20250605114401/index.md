---
title: 更换博客至Astro
published: 2025-06-05
description: Astro 是一个 JavaScript Web 框架，专为构建快速、内容驱动的网站而优化。
tags: [Astro]
category: 我得
draft: false
---
# 为什么选择Astro

我使用Hugo也有一段时间了，其凭借静态网页构建博客吸引我的使用。

但最近在网上冲浪发现了一款特别好看的主题：

::github{repo="saicaca/fuwari"}

就是目前在用的这个啦。

# 迁移的过程需要注意什么？

OK...如果你想和我一样将自己原Hugo下的文章迁移至Astro其实非常简单！

因为Hugo与Astro都是使用MarkDown来书写文章的，也就是说，你可以直接将你的Hugo文章复制到Astro的文章目录中`src\content\posts`......吗？

## 文章格式

实则不然，在我使用的主题中，其格式使用TS严格约束：

```ts
        title: z.string(),

        published: z.date(),

        updated: z.date().optional(),

        draft: z.boolean().optional().default(false),

        description: z.string().optional().default(""),

        image: z.string().optional().default(""),

        tags: z.array(z.string()).optional().default([]),

        category: z.string().optional().nullable().default(""),

        lang: z.string().optional().default(""),
```


则，你需要对照修改。

那么我是怎么修改的呢？

哈哈！[Manus](https://manus.im/invitation/7FIHKKNSSJ8CVY)

特别草的一点是tags只可使用单列数组["a","b"]

对于Obsidian来说需要多加一个插件`Linter`

## 链接跳转

安装完后我发现，点击链接默认居然不是新标签页打开

也就是说如果文章中有什么参考资料的话用户直接访问其他网页去了...

得益于NPM，解决方法非常简单！

`npm install rehype-external-links`

astro.config.mjs
```js
	[
	rehypeExternalLinks,
		{
			target: '_blank', rel: ['nofollow', 'noopener', 'noreferrer']
		}
	],
```

现在，链接就是新窗口打开啦。

## 评论系统

主题的main分支默认不支持评论系统，但是有个评论系统的分支

[GitHub - saicaca/fuwari at comments](https://github.com/saicaca/fuwari/tree/comments)

但是其一年没有同步主分支的更新。所以不建议使用，而且其只支持三种评论系统。

|                                                                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |           |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| [Disqus.astro](https://github.com/saicaca/fuwari/blob/comments/src/components/comment/Disqus.astro "Disqus.astro") | [feat: add comment component and comment configuration (](https://github.com/saicaca/fuwari/commit/8e20106df5212c230bdfdeaf85770c90e9ed5295 "feat: add comment component and comment configuration (#37)<br>* ✨ feat: Add comment component and comment configuration<br>* chore: rebuild pnpm-lock<br>---------<br>Co-authored-by: saicaca <zephyird@gmail.com>")[#37](https://github.com/saicaca/fuwari/pull/37)[)](https://github.com/saicaca/fuwari/commit/8e20106df5212c230bdfdeaf85770c90e9ed5295 "feat: add comment component and comment configuration (#37)<br>* ✨ feat: Add comment component and comment configuration<br>* chore: rebuild pnpm-lock<br>---------<br>Co-authored-by: saicaca <zephyird@gmail.com>") | last year |
| [Giscus.astro](https://github.com/saicaca/fuwari/blob/comments/src/components/comment/Giscus.astro "Giscus.astro") | [feat: add comment component and comment configuration (](https://github.com/saicaca/fuwari/commit/8e20106df5212c230bdfdeaf85770c90e9ed5295 "feat: add comment component and comment configuration (#37)<br>* ✨ feat: Add comment component and comment configuration<br>* chore: rebuild pnpm-lock<br>---------<br>Co-authored-by: saicaca <zephyird@gmail.com>")[#37](https://github.com/saicaca/fuwari/pull/37)[)](https://github.com/saicaca/fuwari/commit/8e20106df5212c230bdfdeaf85770c90e9ed5295 "feat: add comment component and comment configuration (#37)<br>* ✨ feat: Add comment component and comment configuration<br>* chore: rebuild pnpm-lock<br>---------<br>Co-authored-by: saicaca <zephyird@gmail.com>") | last year |
| [Twikoo.astro](https://github.com/saicaca/fuwari/blob/comments/src/components/comment/Twikoo.astro "Twikoo.astro") | [feat: add comment component and comment configuration (](https://github.com/saicaca/fuwari/commit/8e20106df5212c230bdfdeaf85770c90e9ed5295 "feat: add comment component and comment configuration (#37)<br>* ✨ feat: Add comment component and comment configuration<br>* chore: rebuild pnpm-lock<br>---------<br>Co-authored-by: saicaca <zephyird@gmail.com>")[#37](https://github.com/saicaca/fuwari/pull/37)[)](https://github.com/saicaca/fuwari/commit/8e20106df5212c230bdfdeaf85770c90e9ed5295 "feat: add comment component and comment configuration (#37)<br>* ✨ feat: Add comment component and comment configuration<br>* chore: rebuild pnpm-lock<br>---------<br>Co-authored-by: saicaca <zephyird@gmail.com>") | last year |

你可能会觉得Twikoo不挺好的吗，我把这个分支的修改内容手动同步一下不就行了？

实则不然，Twikoo对于Astro的兼容性十分地差。

如果你这么做了，那么就会遇到第一次打开文章无法加载评论...

所以你可以看我现在使用的评论系统

::github{repo="walinejs/waline"}

迁移也很简单，官方提供了Twikoo至waline的迁移工具

[数据迁移助手 \| Waline](https://waline.js.org/migration/tool.html)

然后在src/pages/post/[...slug].astro修改如下内容

53行下增加

```html
<link rel="stylesheet"href="https://unpkg.com/@waline/client@v3/dist/waline.css"/>
```

140行下增加

```html
<div id="com"></div>
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
  el: '#com',
  serverURL:'你自己的链接',
  reaction:true,
});
</script>
```

然后就行了

## CDN 修改

为什么要修改CDN呢。笨蛋！还不是为了增加你们的访问速度啊。

官方配置的CDN有如下：

api.github.com

api.iconify.design

如果你加了waline，那么还有unpkg.com

api.github.com不推荐修改，~~如果真要修改只能自建代理~~

别自建代理了，tmdGithubAPI有访问限制，代理IP会被ban

`src\plugins\rehype-component-github-card.mjs`

其次api.iconify.design的修改非常简单

[GitHub - iconify/api: Iconify API script. Search engine for icons, provides icon data on demand for icon components, dynamically generates SVG.](https://github.com/iconify/api/)

部署在本地即可

哈？你不想部署？可以私信我用我的（

node_modules\@iconify\svelte\dist\functions.js

node_modules\.vite\deps\@iconify_svelte.js

修改这两个里面的api.iconify.design即可。





