# Visual Audit Checklist

Storybook を一通り監査するとき、または違和感はあるが原因が曖昧なときにこの checklist を使う。

## 1. Hierarchy

- 見た目の重さは component の役割に合っているか。
- color に頼らなくても typography hierarchy が伝わるか。
- 装飾要素が主役の action や content を食っていないか。

## 2. Spacing and Alignment

- component family 内で gap が一貫しているか。
- text baseline、icon、control がきれいに揃っているか。
- sibling variant と比べて詰まりすぎ、または空きすぎになっていないか。

## 3. Container Fit

- narrow、typical、wide の各幅で破綻しないか。
- label、helper text、badge、icon が欠けたり不自然に折り返したりしていないか。
- 余白が偶然ではなく意図として見えるか。

## 4. States

- hover、focus、active、selected、disabled、loading、error が十分見えるか。
- state 変化で layout が不安定になっていないか。
- variant 同士が同じ component family に見えるか。

## 5. Accessibility Signals

- body text、muted text、control の contrast は十分そうか。
- focus indicator が browser default 任せにならず見えるか。
- target size が pointer と touch の両方で十分か。

## 6. Token Drift

- 単発の color、radius、shadow、spacing 値が入り込んでいないか。
- 問題は token、shared primitive、local composition のどこに属するか。
- 同じ defect が複数 story に出るなら、fix を shared layer 側へ降ろす。

## 7. Composition Boundary

- composed story なら、子 component の修正でより広く解決できないか。
- 違和感の原因は component 自体ではなく layout composition ではないか。
- 再利用 component の修正と composed-story cleanup は分け、先に再利用側を終える。
