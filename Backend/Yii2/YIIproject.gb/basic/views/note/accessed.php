<?php

use yii\helpers\Html;
use yii\grid\GridView;
use yii\widgets\Pjax;
/* @var $this yii\web\View */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Notes';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="note-index">

    <h1><?= Html::encode($this->title) ?></h1>
    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <p>
        <?= Html::a('Create Note', ['create'], ['class' => 'btn btn-success']) ?>
    </p>
<?php Pjax::begin(); ?>    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],
            'id:ntext',
            'text:ntext',
            ['attribute'=>'creator_id',
                'label'=> 'Creator',
                'value'=> function($model){
                 /** @var $model \app\models\Note */
                 return $model->creator->username;
                }
            ],
            ['attribute'=>'created_at',
                'format'=>['datetime','dd-MM-yy HH:mm']
            ],

            ['class' => 'yii\grid\ActionColumn',
                'template'=> '{delete}',
                'buttons' => [
                    'delete' => function ($url, $model, $key){
//                       $accessID = yii\helpers\ArrayHelper::getValue($model->accesses,'0.id');
                        return Html::a(\yii\bootstrap\Html::icon('remove'),['/access/delete' ,'id'=>yii\helpers\ArrayHelper::getValue($model->accesses,'0.id')],
                       [
                           'data' => [
                           'confirm' => 'Are you sure you want to delete this item?',
                           'method' => 'post',],
                       ]
                        );}
                ]
            ],
        ],
    ]); ?>
<?php Pjax::end(); ?></div>
