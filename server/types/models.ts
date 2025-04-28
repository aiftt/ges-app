/**
 * MongoDB模型类型定义
 *
 * 创建日期: 2024-11-28
 * 作者: aiftt
 * 用途: 定义MongoDB模型的基本接口
 */
import type { Document, ObjectId } from 'mongodb'

/**
 * 基础文档接口，所有MongoDB模型继承此接口
 */
export interface IBaseDocument extends Document {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 用户文档接口
 */
export interface IUser extends IBaseDocument {
  username: string;
  email: string;
  password?: string; // 存储时应为哈希值
  firstName?: string;
  lastName?: string;
  role: 'admin' | 'user' | 'guest';
  isActive: boolean;
  lastLogin?: Date;
}

/**
 * 产品文档接口
 */
export interface IProduct extends IBaseDocument {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  tags: string[];
  rating?: {
    average: number;
    count: number;
  };
}

/**
 * 订单文档接口
 */
export interface IOrder extends IBaseDocument {
  orderNumber: string;
  userId: ObjectId;
  items: {
    productId: ObjectId;
    name: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  shippedAt?: Date;
  deliveredAt?: Date;
}

/**
 * 内容文档接口
 */
export interface IContent extends IBaseDocument {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author: ObjectId;
  categories: string[];
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  featuredImage?: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

/**
 * 设置文档接口
 */
export interface ISettings extends Document {
  _id: string; // 使用具有特定含义的字符串ID，如'general', 'email', 'payment'
  values: Record<string, unknown>;
  updatedAt: Date;
}

/**
 * 日志文档接口
 */
export interface ILog extends IBaseDocument {
  level: 'info' | 'warning' | 'error' | 'debug';
  message: string;
  context?: Record<string, unknown>;
  timestamp: Date;
  userId?: ObjectId;
  ip?: string;
  userAgent?: string;
  path?: string;
}
