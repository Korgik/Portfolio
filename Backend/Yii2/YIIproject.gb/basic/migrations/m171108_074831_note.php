<?php

use yii\db\Migration;

class m171108_074831_note extends Migration
{
    public function safeUp()
    {
        $this ->createTable('{{note}}',[
            'id' => $this->primaryKey(),
                'text' => $this->text()->notNull(),
                'creator_id' => $this->integer()->notNull(),
                'creator_at' => $this->integer()->null(),
            ]
        );
    }

    public function safeDown()
    {
        echo "m171108_074831_note cannot be reverted.\n";

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m171108_074831_note cannot be reverted.\n";

        return false;
    }
    */
}
