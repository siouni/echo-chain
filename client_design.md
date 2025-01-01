
# クライアント設計（ノード）

## 1. クライアントの役割
- **ノードとしての機能**: ユーザーの投稿、フォロー、ブックマークを管理。
- **ローカルデータ保存**: SQLiteを利用してローカルに投稿を保存。

## 2. 投稿データ管理
- ノード自身の投稿はローカルDBに保存し、IPFS上ではピンを行わない。
- 他ノードがリプライ、リポスト、引用リポストした場合、それを行ったノードが投稿をピン。
- **ブックマーク機能**: ブックマークしたノードが投稿をピン。
- OrbitDBでのデータ管理:
  - 各ノードはフォローユーザーの投稿など関連データのみ保持。
  - データ競合時は最新データを優先。

## 3. 主要機能
- **短文投稿**: 最大140文字のテキスト投稿。
- **ブックマーク機能**: 投稿をブックマークし、後で参照可能。
- **リプライ・リポスト・引用リポスト**: ユーザー間の投稿インタラクション。
- **いいね機能**: 投稿への簡単なフィードバック。
- **フォロー機能**: 他ユーザーをフォローし、投稿をタイムラインに表示。
- **通知機能**: リアルタイムでフォローユーザーの投稿やインタラクションを通知。
- **投稿削除機能**: 自分の投稿を削除可能（編集は非対応）。
- **ユーザーと投稿のレポート機能**:
  - レポート作成と投票機能。
  - 信頼スコア導入後はスコアに応じたレポート権限の制御を予定。
- **ブロック機能**: ブロックされたユーザーの投稿は閲覧可能だが、リプライやインタラクションは不可。

## 4. UI/UX設計
- シンプルなデザインを基調とし、X（旧Twitter）のUIを参考。
- 初期段階では基本的な操作に絞った設計。

## 5. 認証とセキュリティ（クライアント）
- **公開鍵暗号による認証**:
  1. 接続リクエストの署名: クライアントが秘密鍵で署名。
  2. 署名検証: 接続先が公開鍵を使用してリクエストを確認。
  3. 認証成立: 有効な署名で接続確立。
- **秘密鍵管理**:
  - クライアントが秘密鍵の一部を保持。
  - IPFS上のバックアップを活用して復元可能。

## 6. 技術スタック（クライアント）
- **フロントエンド**: ReactNativeExpo, ReactNativeWeb。
- **データベース**: OrbitDB, SQLite。
- **クロスプラットフォーム**: Electron。