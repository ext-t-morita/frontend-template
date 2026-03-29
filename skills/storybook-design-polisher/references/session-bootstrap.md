# Session Bootstrap

## 目的

`cdpb` で Chrome dev browser を立ち上げ、`pnpm storybook` を起動し、CDP 経由で `localhost:6006` を開く。

## 手順

1. dev browser を起動する。

```bash
zsh -ic 'cdpb about:blank'
```

2. repo root で Storybook を起動する。

```bash
pnpm storybook
```

3. Storybook の待機には `scripts/wait-for-storybook.sh` を使う。

```bash
./skills/storybook-design-polisher/scripts/wait-for-storybook.sh
```

4. CDP 経由で Storybook を開く。`agent-browser` が使えるならそれを優先する。

```bash
agent-browser --cdp 9222 open http://127.0.0.1:6006
agent-browser --cdp 9222 wait --load networkidle
agent-browser --cdp 9222 snapshot -i
```

## fallback

- `agent-browser` が使えないなら Playwright MCP で `http://127.0.0.1:6006` を開く。
- `cdpb` が見つからないなら `~/.zshrc` の alias 定義を確認する。
- port が埋まっているなら既存の Storybook や Chrome dev profile の残骸を疑う。
