<?php

use yii\db\Migration;

class m171108_074142_user extends Migration
{
    public function safeUp()
    {
        $this->createTable( '{{user}}',[
                'id' => $this->primaryKey(),
                'username' => $this->string(255)->notNull(),
                'name' => $this->string(255)->notNull(),
                'surname' => $this->string(255)->null(),
                'password_hash' => $this->string(255)->notNull(),
                'access_token' => $this->string(255)->null()->defaultValue(null),
                'auth_key' => $this->string(255)->null()->defaultValue(null),
                'created_at' => $this->integer()->null(),
        ]
        );
    }

    public function safeDown()
    {
        echo "m171108_074142_user cannot be reverted.\n";

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m171108_074142_user cannot be reverted.\n";

        return false;
    }
    */
}
