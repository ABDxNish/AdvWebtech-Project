import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';


@Entity()
export class USER_INFO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  phone_no: string;

  @Column()
  address: string;

  @Column()
  dob: Date;

  @Column()
  gender: string;

  @Column()
  nid_no: string;

  @Column()
  nid_pic_path: string;

  @Column()
  profile_pic_path: string;

  @Column()
  description: string;

  @Column()
  user_type: string;

  @Column()
  status: string;

  // OneToMany Example
  @OneToMany(() => BOOKING_INFO, (booking) => booking.user)
  bookings: BOOKING_INFO[];

  // ManyToMany Example
  @ManyToMany(() => BLOG_INFO, (blog) => blog.likedUsers)
  likedBlogs: BLOG_INFO[];
}





@Entity()
export class AGENCY_INFO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  phone_no: string;

  @Column()
  address: string;

  @Column()
  company_size: number;

  @Column()
  description: string;

  @Column()
  status: string;
}
@Entity()
export class LOGIN_INFO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  refreshToken: string;

  @OneToOne(() => AGENCY_INFO, { nullable: true,onDelete:"CASCADE" })
  @JoinColumn({ name: 'user_id' })
  user: AGENCY_INFO;
}
@Entity()
export class PACKAGE_INFO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @ManyToOne(() => AGENCY_INFO)
  @JoinColumn({ name: 'agency_id' })
  agency: AGENCY_INFO;
}


@Entity()
export class TRANSPORT_INFO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  price_per_seat: number;

  @Column()
  capacity: number;
}
@Entity()
export class BOOKING_INFO {
  @PrimaryGeneratedColumn()
  id: number;

  // ManyToOne Example
  @ManyToOne(() => USER_INFO, (user) => user.bookings)
  @JoinColumn({ name: 'user_id' })
  user: USER_INFO;

  @ManyToOne(() => PACKAGE_INFO)
  @JoinColumn({ name: 'package_id' })
  package: PACKAGE_INFO;

  @ManyToOne(() => TRANSPORT_INFO)
  @JoinColumn({ name: 'transport_id' })
  transport: TRANSPORT_INFO;

  @Column()
  booking_data: Date;

  @Column()
  status: string;
}

@Entity()
export class PAYMENT_INFO {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => BOOKING_INFO)
  @JoinColumn({ name: 'booking_id' })
  booking: BOOKING_INFO;

  @Column()
  payment_method: string;

  @Column()
  amount: number;

  @Column()
  status: string;

  @Column()
  transaction_no: string;
}


@Entity()
export class DESTINATION_INFO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  best_season: string;

  @Column()
  popularity_score: number;
}


@Entity()
export class REVIEW_INFO {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => USER_INFO)
  @JoinColumn({ name: 'user_id' })
  user: USER_INFO;

  @ManyToOne(() => USER_INFO)
  @JoinColumn({ name: 'target_id' })
  target: USER_INFO;

  @Column()
  review_text: string;

  @Column()
  rating: number;
}

@Entity()
export class BLOG_INFO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  author_id: number;

  @Column()
  comment_count: number;

  @Column()
  created_at: Date;

  @Column()
  react_count: number;

  // ManyToMany side for liked blogs
  @ManyToMany(() => USER_INFO, (user) => user.likedBlogs)
  @JoinTable({
    name: 'blog_likes',
    joinColumn: { name: 'blog_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  likedUsers: USER_INFO[];
}


@Entity()
export class COMMENT_INFO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  commentor_id: number;

  @Column()
  content: string;

  @Column()
  comment_description: string;

  @Column()
  comment_time: Date;

  @Column()
  blog_id: number;
}