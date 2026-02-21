// data.ts

export interface Data {
  properties: Property[]
  tasks: Task[]
}

export type PropertyCategory =
  | '施設'
  | '物件'

export type PropertyStatus =
  | '保留中'
  | '調査前'
  | '内覧可'

export interface Property {
  ID: string
  名称: string
  住所: string
  緯度: number
  経度: number
  カテゴリ: PropertyCategory
  ステータス: PropertyStatus
  ツアー物件: string
  ランク: string
  間取り図: string
  形態: string
  価格帯: string
  間取り: string
  設備: string
  特徴: string
  要修繕箇所: string
  空き家になった年: number | ''
  空き家の状況: string
  家主氏名: string
  家主連絡先: string
  仲介者氏名: string
  仲介者連絡先: string
}

export type TaskPriority = 
  | '最重要'
  | '高'
  | '中'
  | '低'

export type TaskEffort =
  | '大'
  | '中'
  | '小'

export type TaskStatus =
  | '完了'
  | '進行中'
  | '保留'

export interface Task {
  ID: number
  段階: string
  タスク名: string
  重要度: TaskPriority
  労力度: TaskEffort
  進捗: TaskStatus
  期限: string
  備考: string
}
