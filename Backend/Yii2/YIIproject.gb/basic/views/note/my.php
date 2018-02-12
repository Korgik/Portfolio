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
//            'id:ntext',
            'text:ntext',
            ['attribute'=>'created_at',
                'format'=>['datetime','dd-MM-yy HH:mm']
            ],

            ['class' => 'yii\grid\ActionColumn',
                'template'=> '{view} {update} {delete} {access}',
                'buttons' => [
                    'access' => function ($url, $model, $key){
                        return Html::a(\yii\bootstrap\Html::icon('link'), ['/access/create' ,'id'=>$model->id]);
                        }
                ]
            ],
        ],
    ]); ?>
<?php Pjax::end(); ?></div>
