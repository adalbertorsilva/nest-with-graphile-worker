import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('candidates')
export class CandidateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'name', nullable: false })
  name: string;
}
