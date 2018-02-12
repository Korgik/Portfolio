<?php

namespace app\controllers;


use app\models\Product;
use yii\helpers\VarDumper;
use yii\web\Controller;
use app\components;


class TestController extends Controller
{

    public function actionIndex()
    {
//        \Yii::$app->db->createCommand()-> addForeignKey('fx_access_user', 'access', ['user_id'], 'user', ['id'])->execute();
//        \Yii::$app->db->createCommand()-> addForeignKey('fx_access_note', 'access', ['note_id'], 'note', ['id'])->execute();
//        \Yii::$app->db->createCommand()-> addForeignKey('fx_note_user', 'note', ['creator_id'], 'user', ['id'])->execute();

        $test = \Yii::$app->test->run();
        return $this->render('index', ['test'=>$test]);
    }

    public function actionInsert()
    {
//        \Yii::$app->db->createCommand()->insert('user',[
//            'username' => 'Korgik',
//            'name' => 'Александр',
//            'surname' => 'Дайнеко',
//            'password_hash' => 'QAZWSXEDCRFV123456789',
//        ])->execute();
//
//        \Yii::$app->db->createCommand()->insert('user',[
//            'username' => 'X-man',
//            'name' =>'Павел',
//            'password_hash' => 'QAZWSXEDCRFV123456789',
//        ])->execute();
//
//        \Yii::$app->db->createCommand()->insert('user',[
//            'username' => 'TopProger',
//            'name' =>'Василий',
//            'password_hash' => 'QAZWSXEDCRFV123456789',
//        ])->execute();
//
//        \Yii::$app->db->createCommand()->insert('user',[
//            'username' => 'Son_of_Odin',
//            'name' =>'Тор',
//            'password_hash' => 'QAZWSXEDCRFV123456789',
//        ])->execute();
//
//
//        \Yii::$app->db->createCommand()->batchInsert('note', ['text', 'creator_id', 'creator_at'],
//            [
//                ['ПростоТекст', 2, strtotime('now')],
//                ['ЕщеТекст', 3, strtotime('25 September 2012')],
//                ['ИнтересныйТекст', 4, strtotime('29 November 2018')],
//            ])->execute();

        return $this->render('insert');
    }

    public function actionSelect()
    {
        $query = (new \yii\db\Query())
//            ->select(['[[id]]','[[name]]','[[username]]'])
            ->from('{{user}}')
            ->orderBy('name ASC')
            ->where(['>','[[id]]',1])
//            ->params([':id'=>1])
            ->limit(3)
        ;

        $query2 = (new \yii\db\Query())
            ->from('note')
            ->innerJoin('user','note.creator_id=user.id')
        ;

        $data =($query->createCommand()->queryAll());

        $data2 =($query2->createCommand()->queryAll());
        _end($data);
        return $this->render('select');
    }
}
