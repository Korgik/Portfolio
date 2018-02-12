<?php

use yii\db\Migration;

class m171108_074842_access extends Migration
{
    public function safeUp()
    {
        $this ->createTable('{{access}}',[
            'id' => $this->primaryKey(),
                'note_id' => $this->integer()->notNull(),
                'user_id' => $this->integer()->notNull(),
        ]
        );
    }

    public function safeDown()
    {
        echo "m171108_074842_access cannot be reverted.\n";

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m171108_074842_access cannot be reverted.\n";

        return false;
    }
    */
}
