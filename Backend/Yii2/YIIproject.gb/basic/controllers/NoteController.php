<?php

namespace app\controllers;

use Yii;
use app\models\Note;
use app\models\NoteSearch;
use yii\data\ActiveDataProvider;
use yii\web\Controller;
use yii\web\ForbiddenHttpException;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;

/**
 * NoteController implements the CRUD actions for Note model.
 */
class NoteController extends Controller
{
    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'delete' => ['POST'],
                ],
            ],
            'access' => [
                    'class' => AccessControl::className(),
                    'rules' => [
                        [
                            'allow' => true,
                            'roles' => ['@'],
                        ],
                    ],
            ],
        ];
    }


    public function actionMy(){
        $dataProvider = new ActiveDataProvider([
           'query' => Note::find()->byCreator(Yii::$app->user->id)
        ]);

        return $this-> render('my', [
            'dataProvider' =>$dataProvider,
        ]);
    }

    public function actionAccessed(){
        $dataProvider = new ActiveDataProvider([
            'query' => Note::find()->innerJoinWith('accesses')->where(['access.user_id'=>Yii::$app->user->id])
        ]);

        return $this->render('accessed',['dataProvider' =>$dataProvider]);
    }

    /**
     * Displays a single Note model.
     * @param integer $id
     * @return mixed
     */
    public function actionView($id)
    {
        return $this->render('view', [
            'model' => $this->findModel($id),
        ]);
    }

    /**
     * Creates a new Note model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return mixed
     */
    public function actionCreate()
    {
        $model = new Note();
        $model ->creator_id= Yii::$app->user->id;

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            Yii::$app->session->setFlash('notice', 'Note created');
            return $this->redirect(['my', 'id' => $model->id]);
        } else {
            return $this->render('create', [
                'model' => $model,
            ]);
        }
    }

    /**
     * Updates an existing Note model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param integer $id
     * @return mixed
     */
    public function actionUpdate($id)
    {

        $model = $this->findModel($id);
        if ($model->creator_id !=Yii::$app->user->id){
            throw new ForbiddenHttpException('Нет доступа');
        }

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['my', 'id' => $model->id]);
        } else {
            return $this->render('update', [
                'model' => $model,
            ]);
        }
    }

    /**
     * Deletes an existing Note model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param integer $id
     * @return mixed
     */
    public function actionDelete($id)
    {

        $model = $this->findModel($id);

        if ($model->creator_id !=Yii::$app->user->id){
            throw new ForbiddenHttpException('Нет доступа');
        }
        $model->delete();

        return $this->redirect(['my']);
    }

    /**
     * Finds the Note model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param integer $id
     * @return Note the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = Note::findOne($id)) !== null) {
            return $model;
        } else {
            throw new NotFoundHttpException('The requested page does not exist.');
        }
    }
}
