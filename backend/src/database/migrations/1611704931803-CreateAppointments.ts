import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateAppointments1611704931803 implements MigrationInterface {
    // médodo para dizer o que eu quero que faça quando a migration for executada.
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns: [{
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'provider',
                    type: 'varchar',
                },
                {
                    name: 'date',
                    type: 'timestamp with time zone',
                    isNullable: false
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                }
            ]
            })
        )
    }

    // Se tiver algum problema - utilizado para desfazer o que foi feito. 
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments');
    }

}
