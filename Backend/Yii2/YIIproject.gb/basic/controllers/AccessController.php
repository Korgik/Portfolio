<?php

namespace app\controllers;

use app\models\Note;
use app\models\User;
use SebastianBergmann\CodeCoverage\Report\Xml\Node;
use Yii;
use app\models\Access;
use app\models\AccessSearch;
use yii\web\Controller;
use yii\web\ForbiddenHttpException;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;

/**
 * AccessController implements the CRUD actions for Access model.
 * @property Access[] $accesses
 * @property Note[] $notes
 */
class AccessController extends Controller
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

//    /**
//     * Lists all Access models.
//     * @return mixed
//     */
//    public function actionIndex()
//    {
//        $searchModel = new AccessSearch();
//        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);
//
//        return $this->render('index', [
//            'searchModel' => $searchModel,
//            'dataProvider' => $dataProvider,
//        ]);
//    }

    /**
     * Displays a single Access model.
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
     * Creates a new Access model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return mixed
     */
    public function actionCreate($id = null)
    {
        $note = Note::findOne($id);
        if (!$note || $note->creator_id !=Yii::$app->user->id){
            throw new ForbiddenHttpException('Нет доступа');
        }
        $model = new Access();
        $model ->note_id=$id;
        $users = User::find()->exceptUser(Yii::$app->user->id)->select('username')->indexBy('id')->column();
        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['note/my', 'id' => $model->id]);
        } else {
            return $this->render('create', [
                'model' => $model,
                'users' => $users
            ]);
        }
    }


    /**
     * Deletes an existing Access model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param integer $id
     * @return mixed
     */
    public function actionDelete($id)
    {
        $note = Note::findOne($id);
//        $model = new Note();
//        $model = Note::REL_USER;
//        $LinkUserQuery= new Note();
        if (!$note || $note->creator_id !=Yii::$app->user->id){
            throw new ForbiddenHttpException('Нет доступа');
        }

//        $this->findModel($id)->delete();

        return $this->redirect(['note/accessed']);
    }

    /**
     * Finds the Access model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param integer $id
     * @return Access the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = Access::findOne($id)) !== null) {
            return $model;
        } else {
            throw new NotFoundHttpException('The requested page does not exist.');
        }
    }
}
